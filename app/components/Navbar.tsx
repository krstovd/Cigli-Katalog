"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang, type Lang } from "@/app/context/LangContext";

const links: Record<Lang, readonly (readonly [string, string])[]> = {
  mk: [["ПОЧЕТНА", "/"], ["КАТАЛОГ", "/catalog"], ["ИНСПИРАЦИЈА", "/inspiration"], ["ЗА НАС", "/about"], ["КОНТАКТ", "/contact"]],
  en: [["HOME", "/"], ["CATALOG", "/catalog"], ["INSPIRATION", "/inspiration"], ["ABOUT", "/about"], ["CONTACT", "/contact"]],
};

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <Link href="/" className="brand" aria-label="ZMAGA почетна">
        <Image src="/images/zmaga-logo.png" alt="ZMAGA Декоративни цигли" width={160} height={80} priority />
      </Link>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {links[lang].map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} className={pathname === href ? "active" : ""}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="nav-actions">
        <div className="nav-contact">
          <a href="tel:+38970842079" className="phone" aria-label="Јавете се на +389 70 842 079">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6 19.7 19.7 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 2 2.3Z"/></svg>
            <span>+389 70 842 079</span>
          </a>
          <span className="messaging-links">
            <a className="whatsapp-link" href="https://wa.me/38970842079" target="_blank" rel="noreferrer" aria-label="Пишете ни на WhatsApp" title="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.4c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.4Zm-8.4 18.2c-1.7 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.5 9.8-9.9 9.8Zm5.4-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.7-.3-.6.3-.5.9-1.8.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 2.2.9 3.1 1 4.2.8.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.1-.4-.2-.7-.4Z"/></svg>
            </a>
            <a className="viber-link" href="viber://chat?number=%2B38970842079" aria-label="Пишете ни на Viber" title="Viber">
              <Image src="/icons/viber.svg?v=2" alt="" width={15} height={15} />
            </a>
          </span>
        </div>
        <Link href="/contact" className="gold-button">{lang === "mk" ? "ПОБАРАЈ ПОНУДА" : "REQUEST A QUOTE"}</Link>
        <div className="language-switcher" role="group" aria-label="Language">
          <button type="button" onClick={() => setLang("mk")} aria-pressed={lang === "mk"} className={lang === "mk" ? "active" : ""}>MK</button>
          <span aria-hidden="true" />
          <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"} className={lang === "en" ? "active" : ""}>EN</button>
        </div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={lang === "mk" ? "Мени" : "Menu"} aria-expanded={open}>☰</button>
      </div>
    </header>
  );
}
