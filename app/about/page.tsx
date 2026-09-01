"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { useLang } from "@/app/context/LangContext";

const stats = [
  ["12+", "ГОДИНИ ИСКУСТВО", "Посветени на квалитетот и дизајнот."],
  ["800+", "ЗАВРШЕНИ ПРОЕКТИ", "Од домови до ресторани и хотели."],
  ["500+", "ЗАДОВОЛНИ КЛИЕНТИ", "Нашата најголема мотивација."],
  ["100%", "ПОСВЕТЕНОСТ НА КВАЛИТЕТ", "Контролиран процес од избор до испорака."],
];

const values = [
  ["◇", "Премиум материјали", "Користиме висококвалитетен гипс кој обезбедува издржливост и природен изглед."],
  ["⌁", "Модерен дизајн", "Ги следиме светските трендови и креираме модели за секој стил на ентериер."],
  ["⌘", "Лесна монтажа", "Нашите цигли се лесни, практични и наменети за брза и чиста монтажа."],
  ["▣", "Брза испорака", "Испорачуваме сигурно и навремено на целата територија на Македонија."],
];

export default function AboutPage() {
  const { lang } = useLang();
  const en = lang === "en";
  const localizedStats = en ? [
    ["12+", "YEARS OF EXPERIENCE", "Dedicated to quality and design."], ["800+", "COMPLETED PROJECTS", "From homes to restaurants and hotels."],
    ["500+", "SATISFIED CLIENTS", "Our greatest motivation."], ["100%", "COMMITMENT TO QUALITY", "A controlled process from selection to delivery."],
  ] : stats;
  const localizedValues = en ? [
    ["◇", "Premium materials", "We use high-quality gypsum that provides durability and a natural appearance."],
    ["⌁", "Modern design", "We follow global trends and create models for every interior style."],
    ["⌘", "Easy installation", "Our bricks are lightweight, practical and designed for quick, clean installation."],
    ["▣", "Fast delivery", "We deliver reliably and on time throughout Macedonia."],
  ] : values;
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-copy">
          <p className="eyebrow">{en ? "ABOUT US" : "ЗА НАС"}</p>
          <h1>{en ? <>A passion for<br />quality and design</> : <>Страста кон<br />квалитет и дизајн</>}</h1>
          <span className="gold-line" />
          <p>{en ? "Zmaga Decorative Bricks is a brand that creates decorative gypsum bricks designed to bring warmth and character to every space. Our products combine traditional craftsmanship with modern design, creating a unique look for every home or commercial interior." : "Zmaga Декоративни Цигли е бренд кој создава декоративни гипсени цигли со цел да донесе топлина и карактер во секој простор. Нашите производи комбинираат традиционална изработка со модерен дизајн, создавајќи уникатен изглед за секој дом или деловен простор."}</p>
        </div>
      </section>

      <section className="about-stat-panel">
        {localizedStats.map(([number, label, description]) => (
          <article key={label}>
            <div className="stat-top"><i>◇</i><strong>{number}</strong></div>
            <b>{label}</b>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <section className="about-values" id="values">
        <div className="about-values-photo">
          <Image src="/images/about-values-arena.png" alt={en ? "Modern interior with ZMAGA ARENA decorative bricks" : "Модерен ентериер со ZMAGA ARENA декоративни цигли"} fill />
        </div>
        <div className="about-values-copy">
          <p className="eyebrow">{en ? "OUR VALUES" : "НАШИТЕ ВРЕДНОСТИ"}</p>
          <h2>{en ? "What makes us different?" : "Што нè прави различни?"}</h2>
          <span className="gold-line" />
          <div className="about-values-grid">
            {localizedValues.map(([icon, title, text]) => (
              <article key={title}>
                <i>{icon}</i>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-bottom-cta">
        <div className="about-cta-main">
          <div className="cta-emblem"><Image src="/android-chrome-192x192.png" alt="" width={64} height={64} /></div>
          <div className="about-cta-copy">
            <span>{en ? "FREE CONSULTATION" : "БЕСПЛАТНА КОНСУЛТАЦИЈА"}</span>
            <h2>{en ? "Find the right decorative bricks for your space." : "Пронајдете ги вистинските декоративни цигли за вашиот простор."}</h2>
            <p>{en ? "Send us a photo or an idea — we will help you choose the model, quantity and best solution." : "Испратете ни фотографија или идеја — ќе ви помогнеме со изборот на модел, количина и најдобро решение."}</p>
          </div>
        </div>
        <Link href="/contact" className="gold-button about-cta-button"><span>{en ? "CONTACT US" : "КОНТАКТИРАЈТЕ НÈ"}</span><b>→</b></Link>
      </section>
      <Footer />
    </main>
  );
}
