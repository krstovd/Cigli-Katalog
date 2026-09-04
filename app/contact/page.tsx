"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { useLang, type Lang } from "@/app/context/LangContext";

type ContactInfo = { label: string; value: string; detail: string; href?: string; icon: "phone" | "mail" | "location" | "clock" };

const getInfo = (lang: Lang): ContactInfo[] => lang === "mk" ? [
  { label: "ТЕЛЕФОН", value: "+389 70 842 079", detail: "Пон – Пет, 08:00 – 18:00", href: "tel:+38970842079", icon: "phone" },
  { label: "Е-ПОШТА", value: "zmaga.dooel@yahoo.com", detail: "Одговараме во најкраток можен рок", href: "mailto:zmaga.dooel@yahoo.com", icon: "mail" },
  { label: "АДРЕСА", value: "Крум Вранински 29, 2300 Кочани", detail: "Посетете нè или отворете ја локацијата", href: "https://maps.google.com/?q=Zmaga+Dekorativni+Cigli", icon: "location" },
  { label: "РАБОТНО ВРЕМЕ", value: "Пон – Пет: 08:00 – 18:00", detail: "Сабота и Недела: 09:00 – 17:00", icon: "clock" },
] : [
  { label: "PHONE", value: "+389 70 842 079", detail: "Mon – Fri, 08:00 – 18:00", href: "tel:+38970842079", icon: "phone" },
  { label: "EMAIL", value: "zmaga.dooel@yahoo.com", detail: "We will respond as soon as possible", href: "mailto:zmaga.dooel@yahoo.com", icon: "mail" },
  { label: "ADDRESS", value: "Krum Vraninski 29, 2300 Kochani", detail: "Visit us or open the location", href: "https://maps.google.com/?q=Zmaga+Dekorativni+Cigli", icon: "location" },
  { label: "OPENING HOURS", value: "Mon – Fri: 08:00 – 18:00", detail: "Saturday and Sunday: 09:00 – 17:00", icon: "clock" },
];

export default function Contact() {
  const { lang } = useLang();
  const en = lang === "en";
  const info = getInfo(lang);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status !== "success") return;

    const timeoutId = window.setTimeout(() => {
      setStatus("idle");
    }, 5_000);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          topic: data.get("topic"),
          message: data.get("message"),
          website: data.get("website"),
          startedAt: startedAt.current,
          lang,
        }),
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
        startedAt.current = Date.now();
        return;
      }
      setStatus("error");
      setError(response.status === 429 ? (en ? "You have sent too many messages. Please try again later." : "Испративте премногу пораки. Обидете се повторно подоцна.") : (en ? "The message was not sent. Please try again or contact us by phone." : "Пораката не беше испратена. Обидете се повторно или контактирајте нè по телефон."));
    } catch {
      setStatus("error");
      setError(en ? "No network connection. Check your connection and try again." : "Нема мрежна врска. Проверете ја конекцијата и обидете се повторно.");
    }
  }

  return (
    <main>
      <section className="page-hero contact-hero" style={{ backgroundImage: "url('/images/contact-hero-rustik-running-bond.webp')" }}>
        <div><p className="eyebrow">{en ? "CONTACT" : "КОНТАКТ"}</p><h1>{en ? "Contact us" : "Контактирајте нè"}</h1><p>{en ? "Do you have questions or would you like a quote?" : "Имате прашања или сакате да добиете понуда?"}</p></div>
      </section>

      <section className="contact-layout">
        <div className="contact-list">
          {info.map((item) => {
            if (item.icon === "phone") {
              return (
                <div className="contact-card" key={item.label}>
                  <span className="contact-icon contact-icon-phone" aria-hidden="true" />
                  <div>
                    <b>{item.label}</b>
                    <div className="phone-contact-row">
                      <a href={item.href}><strong>{item.value}</strong></a>
                      <div className="contact-messaging messaging-links">
                        <a className="whatsapp-link" href="https://wa.me/38970842079" target="_blank" rel="noreferrer" aria-label={en ? "Message us on WhatsApp" : "Пишете ни на WhatsApp"} title="WhatsApp">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.4c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.4Zm-8.4 18.2c-1.7 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.5 9.8-9.9 9.8Zm5.4-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.7-.3-.6.3-.5.9-1.8.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 2.2.9 3.1 1 4.2.8.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.1-.4-.2-.7-.4Z"/></svg>
                        </a>
                        <a className="viber-link" href="viber://chat?number=%2B38970842079" aria-label={en ? "Message us on Viber" : "Пишете ни на Viber"} title="Viber">
                          <Image src="/icons/viber.svg?v=2" alt="" width={15} height={15} />
                        </a>
                      </div>
                    </div>
                    <p>{item.detail}</p>
                  </div>
                </div>
              );
            }
            const body = <><span className={`contact-icon contact-icon-${item.icon}`} aria-hidden="true" /><div><b>{item.label}</b><strong>{item.value}</strong><p>{item.detail}</p></div></>;
            return item.href ? <a className="contact-card" href={item.href} key={item.label} target={item.icon === "location" ? "_blank" : undefined} rel={item.icon === "location" ? "noreferrer" : undefined}>{body}</a> : <div className="contact-card" key={item.label}>{body}</div>;
          })}
          <div className="contact-card contact-social-card">
            <span className="contact-icon contact-icon-community" aria-hidden="true" />
            <div>
              <b>{en ? "SOCIAL MEDIA" : "СОЦИЈАЛНИ МРЕЖИ"}</b>
              <strong>{en ? "See our completed projects" : "Погледнете ги нашите изработки"}</strong>
              <div className="contact-social-links">
                <a href="https://www.facebook.com/profile.php?id=100080947414300" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <span className="contact-social-mark facebook-mark" aria-hidden="true" />
                </a>
                <a href="https://www.instagram.com/zmagadekocigli" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <span className="contact-social-mark instagram-mark" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <p className="eyebrow">{en ? "WRITE TO US" : "ПИШЕТЕ НИ"}</p>
          <h2>{en ? "Send a message" : "Испратете порака"}</h2>
          <p className="form-intro">{en ? "Complete the form and we will contact you as soon as possible." : "Пополнете го формуларот и ќе ве контактираме што е можно побрзо."}</p>
          <input type="hidden" name="website" value="" readOnly />
          <div className="form-two">
            <label>{en ? "First name" : "Име"}<input name="firstName" placeholder={en ? "Your first name" : "Вашето име"} minLength={2} maxLength={60} required /></label>
            <label>{en ? "Last name" : "Презиме"}<input name="lastName" placeholder={en ? "Your last name" : "Вашето презиме"} minLength={2} maxLength={60} required /></label>
          </div>
          <label>{en ? "Email" : "Е-пошта"}<input name="email" type="email" placeholder="example@email.com" maxLength={254} required /></label>
          <label>{en ? "Topic" : "Тема"}<select name="topic" defaultValue="" required><option value="" disabled>{en ? "Select a topic" : "Изберете тема"}</option><option value="product">{en ? "Product inquiry" : "Барање за производ"}</option><option value="order">{en ? "Purchase / order" : "Набавка / нарачка"}</option><option value="technical">{en ? "Technical question" : "Техничко прашање"}</option><option value="collaboration">{en ? "Partnership" : "Соработка"}</option><option value="other">{en ? "Other" : "Друго"}</option></select></label>
          <label>{en ? "Message" : "Порака"}<textarea name="message" placeholder={en ? "How can we help you?" : "Како можеме да ви помогнеме?"} minLength={10} maxLength={3000} required /></label>
          {status === "success" && <p className="form-success" role="status">✓ {en ? "Your message was sent successfully. We will contact you soon." : "Пораката е успешно испратена. Ќе ве контактираме наскоро."}</p>}
          {status === "error" && <p className="form-error" role="alert">{error}</p>}
          <button disabled={status === "sending"} className="gold-button">{status === "sending" ? (en ? "SENDING..." : "СЕ ИСПРАЌА...") : (en ? "SEND MESSAGE →" : "ИСПРАТИ ПОРАКА →")}</button>
        </form>
      </section>

      <div className="map-placeholder"><iframe src="https://www.google.com/maps?q=Zmaga%20Dekorativni%20Cigli&output=embed" title={en ? "ZMAGA location" : "ZMAGA локација"} loading="lazy" /></div>
      <Footer />
    </main>
  );
}
