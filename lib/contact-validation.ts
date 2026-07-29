export const TOPIC_LABELS: Record<string, string> = {
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

const MIN_FORM_COMPLETION_MS = 1_500;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001F\u007F]/;

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  topic: keyof typeof TOPIC_LABELS;
  message: string;
};

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

export function parseContactPayload(
  body: unknown,
  now = Date.now()
): ContactPayload | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return null;
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
    CONTROL_CHARACTER_PATTERN.test(firstName) ||
    !isStringWithinLimit(lastName, 2, LIMITS.name) ||
    CONTROL_CHARACTER_PATTERN.test(lastName) ||
    !isStringWithinLimit(email, 3, LIMITS.email) ||
    !EMAIL_PATTERN.test(email.trim()) ||
    typeof topic !== "string" ||
    !(topic in TOPIC_LABELS) ||
    !isStringWithinLimit(message, 10, LIMITS.message)
  ) {
    return null;
  }

  return {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    topic,
    message: message.trim(),
  };
}

export function escapeHtml(value: string): string {
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
