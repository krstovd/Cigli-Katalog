import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  escapeHtml,
  parseContactPayload,
  TOPIC_LABELS,
} from "@/lib/contact-validation";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
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

    const payload = parseContactPayload(await request.json(), now);
    if (!payload) {
      return badRequest();
    }

    const { firstName, lastName, email, topic, message } = payload;
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact form is unavailable: RESEND_API_KEY is missing.");
      return NextResponse.json(
        { error: "CONTACT_SERVICE_UNAVAILABLE" },
        { status: 500 }
      );
    }

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");
    const topicLabel = TOPIC_LABELS[topic];
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Zmaga Cigli <onboarding@resend.dev>";
    const contactEmail =
      process.env.CONTACT_EMAIL || "zmaga.dooel@yahoo.com";

    const html = `
      <h2>Нова порака од контакт форма</h2>
      <p><strong>Име:</strong> ${safeFirstName} ${safeLastName}</p>
      <p><strong>Е-пошта:</strong> ${safeEmail}</p>
      <p><strong>Тема:</strong> ${topicLabel}</p>
      <p><strong>Порака:</strong></p>
      <p>${safeMessage}</p>
    `;
    const text = [
      "Нова порака од контакт форма",
      "",
      `Име: ${firstName} ${lastName}`,
      `Е-пошта: ${email}`,
      `Тема: ${topicLabel}`,
      "",
      "Порака:",
      message,
    ].join("\n");

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: `Контакт: ${topicLabel} - ${firstName} ${lastName}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend rejected a contact form email:", error);
      return NextResponse.json(
        { error: "CONTACT_SERVICE_UNAVAILABLE" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form request failed:", error);
    return NextResponse.json(
      { error: "INVALID_FORM_DATA" },
      { status: 400 }
    );
  }
}
