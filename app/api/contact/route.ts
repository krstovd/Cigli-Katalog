import { Resend } from "resend";
import { NextResponse } from "next/server";

const TOPIC_LABELS: Record<string, string> = {
  product: "Барање за производ",
  order: "Набавка / нарачка",
  technical: "Технички прашања",
  collaboration: "Соработка",
  other: "Друго",
};

const LIMITS = {
  name: 60,
  email: 254,
  message: 3000,
} as const;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_COMPLETION_MS = 1_500;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isStringWithinLimit(
  value: unknown,
  minLength: number,
  maxLength: number
): value is string {
  const length = typeof value === "string" ? value.trim().length : 0;
  return (
    typeof value === "string" &&
    length >= minLength &&
    length <= maxLength
  );
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(identifier: string, now: number): boolean {
  const existing = rateLimitStore.get(identifier);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function cleanExpiredRateLimits(now: number): void {
  if (rateLimitStore.size < 100) return;

  for (const [identifier, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(identifier);
    }
  }
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character
  );
}

function badRequest() {
  return NextResponse.json({ error: "INVALID_FORM_DATA" }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    const now = Date.now();
    cleanExpiredRateLimits(now);

    if (isRateLimited(getClientIp(request), now)) {
      return NextResponse.json(
        { error: "TOO_MANY_REQUESTS" },
        {
          status: 429,
          headers: { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1000) },
        }
      );
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 20_000) {
      return badRequest();
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return badRequest();
    }

    const { firstName, lastName, email, topic, message, website, startedAt } =
      body as Record<string, unknown>;

    const completionTime =
      typeof startedAt === "number" ? now - startedAt : Number.NaN;

    if (
      website !== "" ||
      !Number.isFinite(completionTime) ||
      completionTime < MIN_FORM_COMPLETION_MS ||
      completionTime > MAX_FORM_AGE_MS ||
      !isStringWithinLimit(firstName, 2, LIMITS.name) ||
      !isStringWithinLimit(lastName, 2, LIMITS.name) ||
      !isStringWithinLimit(email, 3, LIMITS.email) ||
      !EMAIL_PATTERN.test(email.trim()) ||
      typeof topic !== "string" ||
      !(topic in TOPIC_LABELS) ||
      !isStringWithinLimit(message, 10, LIMITS.message)
    ) {
      return badRequest();
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact form is unavailable: RESEND_API_KEY is missing.");
      return NextResponse.json(
        { error: "CONTACT_SERVICE_UNAVAILABLE" },
        { status: 500 }
      );
    }

    const safeFirstName = escapeHtml(firstName.trim());
    const safeLastName = escapeHtml(lastName.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\r?\n/g, "<br>");
    const topicLabel = TOPIC_LABELS[topic];

    const html = `
      <h2>Нова порака од контакт форма</h2>
      <p><strong>Име:</strong> ${safeFirstName} ${safeLastName}</p>
      <p><strong>Е-пошта:</strong> ${safeEmail}</p>
      <p><strong>Тема:</strong> ${topicLabel}</p>
      <p><strong>Порака:</strong></p>
      <p>${safeMessage}</p>
    `;

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL || "zmaga.dooel@yahoo.com",
      replyTo: email.trim(),
      subject: `Контакт: ${topicLabel} - ${firstName.trim()} ${lastName.trim()}`,
      html,
    });

    if (error) {
      console.error("Resend rejected a contact form email:", error);
      return NextResponse.json(
        { error: "CONTACT_SERVICE_UNAVAILABLE" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form request failed:", error);
    return NextResponse.json(
      { error: "INVALID_FORM_DATA" },
      { status: 400 }
    );
  }
}
