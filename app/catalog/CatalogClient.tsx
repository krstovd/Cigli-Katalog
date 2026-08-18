"use client";

import Image from "next/image";
import { useDeferredValue, useState } from "react";
import Footer from "@/app/components/Footer";
import { useLang } from "@/app/context/LangContext";

const imageName = (src: string) => src.split("/").pop()!.replace(/\.webp$/i, "");

export default function CatalogClient({ images }: { images: string[] }) {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());
  const filtered = images.filter((src) => imageName(src).toLocaleLowerCase().includes(deferredQuery));

  return <main>
    <section className="page-hero" style={{ backgroundImage: "url('/images/NOTTE.webp')" }}><div>
      <h1>{lang === "mk" ? "Каталог" : "Catalog"}</h1>
      <p>{lang === "mk" ? "Откријте ја нашата колекција на декоративни гипсени цигли со различни текстури, бои и стилови." : "Discover our collection of decorative gypsum bricks in a range of textures, colors and styles."}</p>
    </div></section>
    <div className="page-shell">
      <div className="filter-bar">
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === "mk" ? "Пребарај модели..." : "Search models..."} aria-label={lang === "mk" ? "Пребарај модели" : "Search models"} />
      </div>
      <div className="catalog-grid">
        {filtered.map((src) => {
          const model = imageName(src);
          const localizedSrc = lang === "en" ? `/images/en/${model}.webp` : src;
          return <article className="product-card" key={src}><Image src={localizedSrc} alt={model} width={400} height={340}/><b>{model}</b><small>{lang === "mk" ? "Декоративна гипсена цигла" : "Decorative gypsum brick"}</small><span>60 {lang === "mk" ? "парчиња" : "pcs"} / m²　→</span></article>;
        })}
        {!filtered.length && <p className="catalog-empty">{lang === "mk" ? "Не пронајдовме модел со тоа име." : "We couldn't find a model with that name."}</p>}
      </div>
    </div>
    <Footer />
  </main>;
}
