"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/app/context/LangContext";

export default function Footer() {
  const { lang } = useLang();
  const copy = lang === "mk" ? {
    description: "Уникатни декоративни гипсени цигли за модерен и топол ентериер.", quick: "БРЗИ ЛИНКОВИ",
    links: ["Почетна", "Каталог", "Инспирација", "За нас", "Контакт"], contact: "КОНТАКТ", hours: "РАБОТНО ВРЕМЕ",
    weekdays: "Пон – Пет:", weekend: "Сабота и Недела:", brand: "ZMAGA Декоративни цигли", quality: "Квалитет создаден за вашиот простор.",
  } : {
    description: "Unique decorative gypsum bricks for modern, warm interiors.", quick: "QUICK LINKS",
    links: ["Home", "Catalog", "Inspiration", "About us", "Contact"], contact: "CONTACT", hours: "OPENING HOURS",
    weekdays: "Mon – Fri:", weekend: "Saturday and Sunday:", brand: "ZMAGA Decorative Bricks", quality: "Quality created for your space.",
  };
  const hrefs = ["/", "/catalog", "/inspiration", "/about", "/contact"];
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image src="/images/zmaga-logo.webp" alt={copy.brand} width={190} height={95} />
          <p>{copy.description}</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/profile.php?id=100080947414300" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg className="facebook-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H7.8V13h2.7v8h3.2Z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/zmagadekocigli" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
                <circle cx="12" cy="12" r="4.1" />
                <circle className="instagram-dot" cx="17.35" cy="6.85" r="1" />
              </svg>
            </a>
          </div>
        </div>
        <nav aria-label={copy.quick}><h4>{copy.quick}</h4>{copy.links.map((label, index) => <Link href={hrefs[index]} key={hrefs[index]}>{label}</Link>)}</nav>
        <div><h4>{copy.contact}</h4><a href="https://maps.google.com/?q=Zmaga+Dekorativni+Cigli" target="_blank" rel="noreferrer">Krum Vraninski 29<br />2300 Kochani</a><a href="tel:+38970842079">+389 70 842 079</a><a href="mailto:zmaga.dooel@yahoo.com">zmaga.dooel@yahoo.com</a></div>
        <div><h4>{copy.hours}</h4><p>{copy.weekdays}<br />08:00 – 18:00</p><p>{copy.weekend}<br />09:00 – 17:00</p></div>
      </div>
      <div className="copyright"><span>© 2026 {copy.brand}.</span><span>{copy.quality}</span></div>
    </footer>
  );
}
