"use client";

import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { useLang } from "./context/LangContext";

const products = [
  { name: "AMBER", image: "AMBER" },
  { name: "ARENA", image: "ARENA" },
  { name: "RUSTIK", image: "RUSTIK" },
  { name: "NOTTE", image: "NOTTE" },
  { name: "LUMINA", image: "LUMINA" },
];
export default function Home() {
  const { lang } = useLang();
  const en = lang === "en";
  const benefits = en ? [
    ["◇", "HIGH QUALITY", "Made from high-quality gypsum."], ["⌘", "MODERN DESIGN", "Contemporary and classic models."],
    ["♧", "EASY INSTALLATION", "Easy to install and maintain."], ["▣", "FAST DELIVERY", "Reliable delivery throughout Macedonia."],
  ] : [
    ["◇", "ВИСОК КВАЛИТЕТ", "Произведени од висококвалитетен гипс."], ["⌘", "МОДЕРЕН ДИЗАЈН", "Современи и класични модели."],
    ["♧", "ЛЕСНА МОНТАЖА", "Лесно се поставуваат и одржуваат."], ["▣", "БРЗА ИСПОРАКА", "Сигурна испорака низ Македонија."],
  ];
  const inspiration = (en ? ["LIVING ROOMS", "KITCHENS", "RESTAURANTS", "CAFÉS"] : ["ДНЕВНИ СОБИ", "КУЈНИ", "РЕСТОРАНИ", "КАФУЛИЊА"])
    .map((title, index) => [title, ["inspiration/living-room-arena-v2.webp", "inspiration/kitchen-rustik-v2.webp", "inspiration/restaurant-gotik-v2.webp", "inspiration/cafe-amber-v2.webp"][index]]);
  const stats = en ? [["12+", "YEARS OF EXPERIENCE"], ["800+", "COMPLETED PROJECTS"], ["500+", "SATISFIED CLIENTS"], ["100%", "COMMITMENT TO QUALITY"]] : [["12+", "ГОДИНИ ИСКУСТВО"], ["800+", "ЗАВРШЕНИ ПРОЕКТИ"], ["500+", "ЗАДОВОЛНИ КЛИЕНТИ"], ["100%", "ПОСВЕТЕНОСТ НА КВАЛИТЕТ"]];
  return (
    <main>
      <Hero />
      <section className="benefits">
        {benefits.map(([icon, title, text]) => <div key={title}><i>{icon}</i><span><b>{title}</b><small>{text}</small></span></div>)}
      </section>

      <section className="light-section home-catalog">
        <div className="section-intro dark-copy">
          <p className="eyebrow">{en ? "CATALOG" : "КАТАЛОГ"}</p>
          <h2>{en ? "Our catalog" : "Нашиот каталог"}</h2>
          <p>{en ? "Discover more than 47 different decorative gypsum brick models." : "Откријте повеќе од 47 различни модели декоративни гипсени цигли."}</p>
          <Link href="/catalog" className="black-button home-catalog-button"><span>{en ? "VIEW ALL MODELS" : "ВИДИ ГИ СИТЕ МОДЕЛИ"}</span><b>→</b></Link>
        </div>
        <div className="product-row">
          {products.map(({ name, image }) => (
            <Link href="/catalog" className="product-card light home-product-card" key={name}>
              <div className="home-product-image">
                <Image src={`/images/home/${image}.webp`} alt={en ? `${name} decorative brick in an interior` : `${name} декоративна цигла во ентериер`} fill sizes="(min-width: 1051px) 260px, (min-width: 701px) 30vw, 45vw" />
              </div>
              <b>{name}</b><small>{en ? "Decorative gypsum brick" : "Декоративна гипсена цигла"}</small><span>{en ? "56 pieces / m²" : "56 парчиња / m²"}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dark-section inspiration-preview">
        <div className="section-intro">
          <p className="eyebrow">{en ? "INSPIRATION" : "ИНСПИРАЦИЈА"}</p>
          <h2>{en ? "Inspire your spaces" : "Инспирирајте ги вашите простори"}</h2>
          <p>{en ? "See how decorative bricks transform every space." : "Погледнете како декоративните цигли го трансформираат секој простор."}</p>
          <Link href="/inspiration" className="gold-button inspiration-button"><span>{en ? "EXPLORE INSPIRATION" : "ПРОГЛЕДАЈ ИНСПИРАЦИЈА"}</span><b>→</b></Link>
        </div>
        <div className="inspiration-row">
          {inspiration.map(([title, image]) => <Link href="/inspiration" className="scene-card" key={title}><Image src={`/images/${image}`} alt={en ? `${title} with decorative bricks from the catalog` : `${title} со декоративни цигли од каталогот`} fill sizes="(min-width: 1051px) 18vw, (min-width: 701px) 45vw, 50vw" /><b>{title}</b></Link>)}
        </div>
      </section>

      <section className="stats light-section">
        {stats.map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}
      </section>
      <Footer />
    </main>
  );
}
