"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/app/context/LangContext";

export default function Hero() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section className="hero">
      <Image
        className="hero-image"
        src="/images/fossil-hero-ultrawide-v3.webp"
        alt=""
        fill
        preload
        sizes="100vw"
      />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow">{en ? "PREMIUM DECORATIVE" : "ПРЕМИУМ ДЕКОРАТИВНИ"}</p>
        <h1>{en ? <>DECORATIVE<br />GYPSUM BRICKS</> : <>ДЕКОРАТИВНИ<br />ГИПСЕНИ ЦИГЛИ</>}</h1>
        <p>{en ? <>Handcrafted models with a unique look<br />for modern, warm interiors.</> : <>Рачно изработени модели со уникатен изглед<br />за модерен и топол ентериер.</>}</p>
        <div className="button-row">
          <Link href="/catalog" className="gold-button">{en ? "VIEW CATALOG" : "РАЗГЛЕДАЈ КАТАЛОГ"} <b>→</b></Link>
          <Link href="/contact" className="outline-button">{en ? "CONTACT US" : "КОНТАКТИРАЈ НÈ"}</Link>
        </div>
        <span className="scroll-hint">↓ &nbsp; {en ? "SCROLL DOWN" : "СКРОЛУВАЈ НАДОЛУ"}</span>
      </div>
    </section>
  );
}
