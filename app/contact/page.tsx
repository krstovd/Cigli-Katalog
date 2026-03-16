"use client";

import { useState, useEffect } from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Footer from "@/app/components/Footer";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
const jost = Jost({ weight: ["400", "500"], subsets: ["latin"] });

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  message: string;
}

const TOPIC_OPTIONS: Record<Lang, { value: string; label: string }[]> = {
  mk: [
    { value: "", label: "Избери тема" },
    { value: "product", label: "Барање за производ" },
    { value: "order", label: "Набавка / нарачка" },
    { value: "technical", label: "Технички прашања" },
    { value: "collaboration", label: "Соработка" },
    { value: "other", label: "Друго" },
  ],
  en: [
    { value: "", label: "Select topic" },
    { value: "product", label: "Product inquiry" },
    { value: "order", label: "Order / purchase" },
    { value: "technical", label: "Technical questions" },
    { value: "collaboration", label: "Collaboration" },
    { value: "other", label: "Other" },
  ],
};

const CONTACT_CONTENT: Record<
  Lang,
  {
    heroLabel: string;
    heroTitle: string;
    heroDesc: string;
    address: string;
    addressFull: string;
    phone: string;
    email: string;
    viberTitle: string;
    whatsappTitle: string;
    formFirstName: string;
    formLastName: string;
    formEmail: string;
    formTopic: string;
    formMessage: string;
    formPlaceholderFirst: string;
    formPlaceholderLast: string;
    formPlaceholderMessage: string;
    formSubmit: string;
    formSending: string;
    formSuccess: string;
    formSuccessDesc: string;
    formNewMessage: string;
    formError: string;
    openMap: string;
    workingHours: string;
    open: string;
    closedBadge: string;
    weekdays: string;
    weekend: string;
  }
> = {
  mk: {
    heroLabel: "КОНТАКТ",
    heroTitle: "Стапете во контакт",
    heroDesc: "За прашања, нарачки или консултации, слободно контактирајте не преку некој од следните канали.",
    address: "Адреса",
    addressFull: "Крум Вранински 29, 2300 Кочани, Северна Македонија",
    phone: "Телефон",
    email: "Е-пошта",
    viberTitle: "Порака на Viber",
    whatsappTitle: "Порака на WhatsApp",
    formFirstName: "Име",
    formLastName: "Презиме",
    formEmail: "Е-пошта",
    formTopic: "Тема",
    formMessage: "Порака",
    formPlaceholderFirst: "Име",
    formPlaceholderLast: "Презиме",
    formPlaceholderMessage: "Вашата порака...",
    formSubmit: "Испрати",
    formSending: "Се испраќа...",
    formSuccess: "Пораката е испратена",
    formSuccessDesc: "Ќе ве контактираме наскоро.",
    formNewMessage: "Нова порака",
    formError: "Грешка при испраќање. Обидете се повторно.",
    openMap: "Отвори карта",
    workingHours: "Работно време",
    open: "отворено",
    closedBadge: "затворено",
    weekdays: "Пон–Пет 08:00–18:00",
    weekend: "Сабота и Недела 09:00–17:00",
  },
  en: {
    heroLabel: "CONTACT",
    heroTitle: "Get in touch",
    heroDesc: "For questions, orders or consultations, feel free to contact us through any of the following channels.",
    address: "Address",
    addressFull: "Krum Vraninski 29, 2300 Kocani, North Macedonia",
    phone: "Phone",
    email: "Email",
    viberTitle: "Message on Viber",
    whatsappTitle: "Message on WhatsApp",
    formFirstName: "First name",
    formLastName: "Last name",
    formEmail: "Email",
    formTopic: "Topic",
    formMessage: "Message",
    formPlaceholderFirst: "First name",
    formPlaceholderLast: "Last name",
    formPlaceholderMessage: "Your message...",
    formSubmit: "Send",
    formSending: "Sending...",
    formSuccess: "Message sent",
    formSuccessDesc: "We will contact you soon.",
    formNewMessage: "New message",
    formError: "Error sending. Please try again.",
    openMap: "Open map",
    workingHours: "Working hours",
    open: "open",
    closedBadge: "closed",
    weekdays: "Mon–Fri 08:00–18:00",
    weekend: "Saturday & Sunday 09:00–17:00",
  },
};

// TODO: replace with your actual address
const PHONE_1 = "+389 70 842 079"; // TODO: replace with your phone number
const PHONE_E164 = PHONE_1.replace(/\D/g, ""); // digits only for Viber/WhatsApp links
const EMAIL = "zmaga.dooel@yahoo.com"; // TODO: replace with your email
const GOOGLE_MAPS_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d705.4552146554852!2d22.426508769621503!3d41.92058899820233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13559340868d7af3%3A0x5f9cd38471bb473!2sZmaga%20Dekorativni%20Cigli!5e1!3m2!1smk!2smk!4v1773099809781!5m2!1smk!2smk"; // TODO: replace with your Google Maps embed URL
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=Zmaga+Dekorativni+Cigli"; // TODO: replace with your Google Maps link

const SOCIAL_LINKS = [
  { name: "Facebook", icon: "https://cdn.simpleicons.org/facebook/1877F2", href: "https://www.facebook.com/profile.php?id=100080947414300" },
  { name: "Instagram", icon: "https://cdn.simpleicons.org/instagram/E4405F", href: "https://www.instagram.com/zmagadekocigli" },
];

function IconAddress() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconViber() {
  return (
    <img
      src="https://cdn.simpleicons.org/viber/7360F2"
      alt=""
      width={22}
      height={22}
      className="size-[22px]"
      aria-hidden
    />
  );
}

function IconWhatsApp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        fill="#25D366"
      />
    </svg>
  );
}

function isWithinWorkingHours(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeMins = hour * 60 + minute;

  if (day === 0 || day === 6) return timeMins >= 540 && timeMins < 1020;
  return timeMins >= 480 && timeMins < 1080;
}

export default function ContactPage() {
  const { lang } = useLang();
  const t = CONTACT_CONTENT[lang];
  const topicOptions = TOPIC_OPTIONS[lang];
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setIsOpen(isWithinWorkingHours());
  }, []);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    topic: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Грешка при испраќање");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.formError);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      topic: "",
      message: "",
    });
  };

  return (
    <div className={`${jost.className} min-h-screen overflow-x-hidden text-white`}>
      <main className="overflow-x-hidden px-4 pb-0 pt-28 sm:px-6 md:px-10 md:pt-36 lg:px-16">
        <div className="mx-auto max-w-4xl space-y-12 lg:space-y-16">
          {/* Hero */}
          <section className="rounded-2xl border border-[#3a3a3a] bg-[#2a2a2a] px-6 py-12 text-center sm:px-10 sm:py-16">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#9ca3af] sm:tracking-[0.5em]">
              {t.heroLabel}
            </p>
            <h1 className={`${cormorant.className} mt-4 text-3xl font-extralight tracking-wide text-white sm:text-4xl md:text-5xl`}>
              {t.heroTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[#9ca3af] sm:text-base">
              {t.heroDesc}
            </p>
          </section>

          {/* Contact Info Grid */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex gap-4 rounded-xl border border-[#3a3a3a] bg-[#1e1e1e] p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2a2a2a]">
                <IconAddress />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9ca3af]">{t.address}</p>
                <p className="mt-1 text-sm text-white sm:text-base">{t.addressFull}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-[#3a3a3a] bg-[#1e1e1e] p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2a2a2a]">
                <IconPhone />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9ca3af]">{t.phone}</p>
                <div className="mt-1 flex items-center gap-2 flex-nowrap">
                  <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="shrink-0 whitespace-nowrap text-sm text-white underline hover:text-[#e5e7eb] sm:text-base">
                    {PHONE_1}
                  </a>
                  <span className="-translate-y-1.5 ml-3 flex shrink-0 items-center gap-2">
                    <a
                      href={`viber://add?number=${PHONE_E164}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2a2a2a] transition-colors hover:bg-[#3a3a3a]"
                      aria-label="Viber"
                      title={t.viberTitle}
                    >
                      <IconViber />
                    </a>
                    <a
                      href={`https://wa.me/${PHONE_E164}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2a2a2a] transition-colors hover:bg-[#3a3a3a]"
                      aria-label="WhatsApp"
                      title={t.whatsappTitle}
                    >
                      <IconWhatsApp />
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-full flex gap-4 rounded-xl border border-[#3a3a3a] bg-[#1e1e1e] p-5 sm:col-span-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2a2a2a]">
                <IconEmail />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9ca3af]">{t.email}</p>
                <a href={`mailto:${EMAIL}`} className="mt-1 block text-sm text-white underline hover:text-[#e5e7eb] sm:text-base">
                  {EMAIL}
                </a>
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section className="grid grid-cols-2 gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[#3a3a3a] bg-[#1e1e1e] p-6 transition-colors hover:bg-[#2a2a2a] hover:border-[#525252]"
              >
                <img
                  src={social.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 transition-opacity group-hover:opacity-90"
                  aria-hidden
                />
                <span className="text-xs font-medium uppercase tracking-wider text-[#9ca3af] transition-colors group-hover:text-white">
                  {social.name}
                </span>
              </a>
            ))}
          </section>

          {/* Contact Form */}
          <section className="rounded-2xl border border-[#3a3a3a] bg-[#2a2a2a] p-6 sm:p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <IconCheck />
                <h2 className={`${cormorant.className} mt-6 text-2xl font-light text-white sm:text-3xl`}>
                  {t.formSuccess}
                </h2>
                <p className="mt-2 text-sm text-[#9ca3af]">
                  {t.formSuccessDesc}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 text-sm font-medium text-white underline hover:text-[#e5e7eb]"
                >
                  {t.formNewMessage}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                      {t.formFirstName}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#3a3a3a] bg-[#1e1e1e] px-4 py-2.5 text-white placeholder:text-[#9ca3af]/60 focus:border-[#525252] focus:outline-none focus:ring-1 focus:ring-[#525252]"
                      placeholder={t.formPlaceholderFirst}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                      {t.formLastName}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#3a3a3a] bg-[#1e1e1e] px-4 py-2.5 text-white placeholder:text-[#9ca3af]/60 focus:border-[#525252] focus:outline-none focus:ring-1 focus:ring-[#525252]"
                      placeholder={t.formPlaceholderLast}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                    {t.formEmail}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#3a3a3a] bg-[#1e1e1e] px-4 py-2.5 text-white placeholder:text-[#9ca3af]/60 focus:border-[#525252] focus:outline-none focus:ring-1 focus:ring-[#525252]"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="topic" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                    {t.formTopic}
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#3a3a3a] bg-[#1e1e1e] px-4 py-2.5 text-white focus:border-[#525252] focus:outline-none focus:ring-1 focus:ring-[#525252]"
                  >
                    {topicOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                    {t.formMessage}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full resize-y rounded-lg border border-[#3a3a3a] bg-[#1e1e1e] px-4 py-2.5 text-white placeholder:text-[#9ca3af]/60 focus:border-[#525252] focus:outline-none focus:ring-1 focus:ring-[#525252]"
                    placeholder={t.formPlaceholderMessage}
                  />
                </div>
                {error && (
                  <p className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg border border-[#3a3a3a] bg-white py-3.5 font-medium text-[#1e1e1e] transition-colors hover:bg-[#e5e7eb] disabled:opacity-70"
                >
                  {loading ? t.formSending : t.formSubmit}
                </button>
              </form>
            )}
          </section>

          {/* Google Maps */}
          <section className="overflow-hidden rounded-2xl border border-[#3a3a3a] bg-[#2a2a2a] p-4 sm:p-6">
            <div className="aspect-video min-h-[200px] overflow-hidden rounded-lg">
              <iframe
                src={GOOGLE_MAPS_URL}
                className="h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zmaga Cigli location"
              />
            </div>
            <p className="mt-4 text-sm text-[#9ca3af]">{t.addressFull}</p>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-white underline hover:text-[#e5e7eb]"
            >
              {t.openMap}
            </a>
          </section>

          {/* Working Hours */}
          <section className="rounded-2xl border border-[#3a3a3a] bg-[#2a2a2a] p-6 sm:p-8">
            <h2 className={`${cormorant.className} mb-6 text-xl font-light text-white`}>{t.workingHours}</h2>
            <div className="divide-y divide-[#3a3a3a]">
              <div className="flex flex-wrap items-center justify-between gap-2 py-4">
                <span className="text-sm text-white">{t.weekdays}</span>
                {isOpen !== null && (
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      isOpen
                        ? "border-green-500/50 bg-green-500/20 text-green-400"
                        : "border-red-500/50 bg-red-500/20 text-red-400"
                    }`}
                  >
                    {isOpen ? t.open : t.closedBadge}
                  </span>
                )}
              </div>
              <div className="py-4">
                <span className="text-sm text-white">{t.weekend}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
