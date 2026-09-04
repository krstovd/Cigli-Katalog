import { Resend } from "resend";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
  escapeHtml,
  parseContactPayload,
  TOPIC_LABELS,
  TOPIC_LABELS_EN,
} from "@/lib/contact-validation";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const redisUrl =
  process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL;
const redisToken =
  process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN;
const sharedRateLimit =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({ url: redisUrl, token: redisToken }),
        limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX_REQUESTS, "10 m"),
        prefix: "zmaga:contact",
        analytics: true,
        timeout: 1_500,
      })
    : null;

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

function isLocallyRateLimited(identifier: string, now: number): boolean {
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

async function checkRateLimit(
  identifier: string,
  now: number
): Promise<{ limited: boolean; retryAfter: number }> {
  if (sharedRateLimit) {
    try {
      const result = await sharedRateLimit.limit(identifier);
      return {
        limited: !result.success,
        retryAfter: Math.max(1, Math.ceil((result.reset - now) / 1000)),
      };
    } catch (error) {
      console.error(
        "Shared contact rate limiter is unavailable; using local fallback:",
        error
      );
    }
  }

  return {
    limited: isLocallyRateLimited(identifier, now),
    retryAfter: RATE_LIMIT_WINDOW_MS / 1000,
  };
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
    const rateLimit = await checkRateLimit(getClientIp(request), now);

    if (rateLimit.limited) {
      return NextResponse.json(
        { error: "TOO_MANY_REQUESTS" },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
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

    const { firstName, lastName, email, topic, message, lang } = payload;
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
    const topicLabel = (lang === "en" ? TOPIC_LABELS_EN : TOPIC_LABELS)[topic];
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Zmaga Cigli <onboarding@resend.dev>";
    const contactEmail =
      process.env.CONTACT_EMAIL || "zmaga.dooel@yahoo.com";

    const emailCopy = lang === "en" ? { heading: "New message from the contact form", name: "Name", email: "Email", topic: "Topic", message: "Message", subject: "Contact" } : { heading: "Нова порака од контакт форма", name: "Име", email: "Е-пошта", topic: "Тема", message: "Порака", subject: "Контакт" };
    const html = `
      <h2>${emailCopy.heading}</h2>
      <p><strong>${emailCopy.name}:</strong> ${safeFirstName} ${safeLastName}</p>
      <p><strong>${emailCopy.email}:</strong> ${safeEmail}</p>
      <p><strong>${emailCopy.topic}:</strong> ${topicLabel}</p>
      <p><strong>${emailCopy.message}:</strong></p>
      <p>${safeMessage}</p>
    `;
    const text = [
      emailCopy.heading,
      "",
      `${emailCopy.name}: ${firstName} ${lastName}`,
      `${emailCopy.email}: ${email}`,
      `${emailCopy.topic}: ${topicLabel}`,
      "",
      `${emailCopy.message}:`,
      message,
    ].join("\n");

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: `${emailCopy.subject}: ${topicLabel} - ${firstName} ${lastName}`,
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

    const autoReply = lang === "en"
      ? {
          brand: "",
          subject: "We received your message",
          greeting: `Hello ${safeFirstName},`,
          confirmation: "Thank you for contacting Zmaga Cigli. We have received your message and will get back to you as soon as possible.",
          summary: "Your inquiry",
          closing: "Kind regards,",
          team: "Zmaga Cigli Team",
          note: "This is an automatic confirmation. You can reply directly to this email if you would like to add more information.",
        }
      : {
          brand: "",
          subject: "Ја примивме вашата порака",
          greeting: `Здраво ${safeFirstName},`,
          confirmation: "Ви благодариме што контактиравте со Змага Цигли. Ја примивме вашата порака и ќе ви одговориме во најкраток можен рок.",
          summary: "Вашето барање",
          closing: "Со почит,",
          team: "Тимот на Змага Цигли",
          note: "Ова е автоматска потврда. Можете директно да одговорите на оваа е-пошта доколку сакате да додадете повеќе информации.",
        };

    const autoReplyHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f1f1f;max-width:620px;margin:0 auto">
        <h2 style="color:#b68a3a">${autoReply.brand}</h2>
        <p>${autoReply.greeting}</p>
        <p>${autoReply.confirmation}</p>
        <div style="margin:24px 0;padding:18px;border-left:4px solid #b68a3a;background:#f7f5f1">
          <strong>${autoReply.summary}: ${topicLabel}</strong>
          <p style="margin-bottom:0">${safeMessage}</p>
        </div>
        <p>${autoReply.closing}<br><strong>${autoReply.team}</strong></p>
        <p style="margin-top:28px;font-size:12px;color:#666">${autoReply.note}</p>
      </div>
    `;
    const autoReplyText = [
      autoReply.greeting,
      "",
      autoReply.confirmation,
      "",
      `${autoReply.summary}: ${topicLabel}`,
      message,
      "",
      autoReply.closing,
      autoReply.team,
      "",
      autoReply.note,
    ].join("\n");

    const { error: autoReplyError } = await resend.emails.send({
      from: fromEmail,
      to: email,
      replyTo: contactEmail,
      subject: autoReply.subject,
      html: autoReplyHtml,
      text: autoReplyText,
    });

    if (autoReplyError) {
      console.error("Resend rejected the contact form auto-reply:", autoReplyError);
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
