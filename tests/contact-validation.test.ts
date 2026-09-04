import assert from "node:assert/strict";
import test from "node:test";
import { escapeHtml, parseContactPayload } from "../lib/contact-validation.ts";

const now = 2_000_000;

function validPayload() {
  return {
    firstName: "Давид",
    lastName: "Крстов",
    email: "david@example.com",
    topic: "product",
    message: "Сакам повеќе информации за моделот.",
    website: "",
    startedAt: now - 5_000,
    lang: "mk",
  };
}

test("accepts and trims a valid contact request", () => {
  const payload = validPayload();
  payload.firstName = "  Давид  ";

  assert.deepEqual(parseContactPayload(payload, now), {
    firstName: "Давид",
    lastName: "Крстов",
    email: "david@example.com",
    topic: "product",
    message: "Сакам повеќе информации за моделот.",
    lang: "mk",
  });
});

test("rejects honeypot spam and submissions completed too quickly", () => {
  assert.equal(parseContactPayload({ ...validPayload(), website: "spam" }, now), null);
  assert.equal(parseContactPayload({ ...validPayload(), startedAt: now - 500 }, now), null);
});

test("rejects invalid email, topic and short messages", () => {
  assert.equal(parseContactPayload({ ...validPayload(), email: "invalid" }, now), null);
  assert.equal(parseContactPayload({ ...validPayload(), topic: "unknown" }, now), null);
  assert.equal(parseContactPayload({ ...validPayload(), message: "short" }, now), null);
});

test("normalizes unsupported languages to Macedonian", () => {
  assert.equal(parseContactPayload({ ...validPayload(), lang: "de" }, now)?.lang, "mk");
});

test("escapes HTML used in notification and auto-reply emails", () => {
  assert.equal(
    escapeHtml(`<script>alert("x")</script> & 'test'`),
    "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#039;test&#039;"
  );
});
