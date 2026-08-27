"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/app/components/Footer";
import { useLang } from "@/app/context/LangContext";

const spaces = [
  { mk: "ДНЕВНИ СОБИ", en: "LIVING ROOMS", image: "ARENA.webp" },
  { mk: "КУЈНИ", en: "KITCHENS", image: "RUSTIK.webp" },
  { mk: "РЕСТОРАНИ", en: "RESTAURANTS", image: "GOTIK.webp" },
  { mk: "КАФУЛИЊА", en: "CAFÉS", image: "AMBER.webp" },
  { mk: "КАМИНИ", en: "FIREPLACES", image: "NOTTE.webp" },
  { mk: "СПАЛНИ СОБИ", en: "BEDROOMS", image: "LUMINA.webp" },
  { mk: "БАЊИ", en: "BATHROOMS", image: "AURA.webp" },
  { mk: "ФАСАДИ", en: "FACADES", image: "VIRTUS.webp" },
] as const;

export default function InspirationClient() {
  const { lang } = useLang();
  const [category, setCategory] = useState("all");
  const visible = category === "all" ? spaces : spaces.filter((space) => space.image === category);
  const featured = spaces.slice(0, 4);

  return <main><section className="page-hero" style={{ backgroundImage: "url('/images/RUSTIK.webp')" }}><div>
    <p className="eyebrow">{lang === "mk" ? "ИНСПИРАЦИЈА" : "INSPIRATION"}</p>
    <h1>{lang === "mk" ? "Инспирираме ваши простори" : "We inspire your spaces"}</h1>
    <p>{lang === "mk" ? "Погледнете како нашите декоративни цигли го трансформираат секој простор." : "See how our decorative bricks transform every space."}</p>
  </div></section><div className="page-shell">
    <div className="filter-bar">
      <button type="button" onClick={() => setCategory("all")} className={`filter-pill${category === "all" ? " active" : ""}`}>{lang === "mk" ? "СИТЕ ПРОСТОРИ" : "ALL SPACES"}</button>
      {featured.map((space) => <button type="button" onClick={() => setCategory(space.image)} className={`filter-pill${category === space.image ? " active" : ""}`} key={space.image}>{space[lang]}</button>)}
    </div>
    <div className="inspiration-gallery">{visible.map((space) => <article className="wide-scene" key={space.image}><Image src={`/images/${space.image}`} alt={space[lang]} fill/><div><b>{space[lang]}</b><small>{lang === "mk" ? "Погледни проекти　→" : "View projects　→"}</small></div></article>)}</div>
    <div className="cta-strip"><div><b>{lang === "mk" ? "Имате проект?" : "Have a project?"}</b><p>{lang === "mk" ? "Ќе ви помогнеме да го изберете најдобриот модел." : "We'll help you choose the best model."}</p></div><Link href="/contact" className="gold-button">{lang === "mk" ? "КОНТАКТИРАЈТЕ НÈ" : "CONTACT US"} →</Link></div>
  </div><Footer/></main>;
}
