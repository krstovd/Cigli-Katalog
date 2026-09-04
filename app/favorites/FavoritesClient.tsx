"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import Footer from "@/app/components/Footer";
import ImageModal from "@/app/components/ImageModal";
import { useLang } from "@/app/context/LangContext";
import { useFavorites } from "@/app/hooks/useFavorites";

const imageName = (src: string) => src.split("/").pop()!.replace(/\.webp$/i, "");

export default function FavoritesClient({ images }: { images: string[] }) {
  const { lang } = useLang();
  const { favorites, toggleFavorite } = useFavorites();
  const [selected, setSelected] = useState<string | null>(null);
  const savedImages = useMemo(() => images.filter((src) => favorites.includes(imageName(src))), [favorites, images]);
  const selectedIndex = selected ? savedImages.indexOf(selected) : -1;
  const closePreview = useCallback(() => setSelected(null), []);
  const previousPreview = useCallback(() => setSelected((current) => {
    const index = current ? savedImages.indexOf(current) : -1;
    return savedImages[(index - 1 + savedImages.length) % savedImages.length] ?? null;
  }), [savedImages]);
  const nextPreview = useCallback(() => setSelected((current) => {
    const index = current ? savedImages.indexOf(current) : -1;
    return savedImages[(index + 1) % savedImages.length] ?? null;
  }), [savedImages]);

  return <main className="catalog-page favorites-page">
    <section className="favorites-hero"><span>{lang === "mk" ? "ВАША КОЛЕКЦИЈА" : "YOUR COLLECTION"}</span><h1>{lang === "mk" ? "Омилени модели" : "Favorite models"}</h1><p>{lang === "mk" ? "Сите модели што ги зачувавте на едно место." : "All the models you saved in one place."}</p></section>
    <div className="catalog-shell favorites-shell">
      {savedImages.length > 0 ? <div className="catalog-grid">
        {savedImages.map((src) => {
          const model = imageName(src);
          const localizedSrc = lang === "en" ? `/images/en/${model}.webp` : src;
          return <article className="catalog-card" key={src} role="button" tabIndex={0} aria-label={`${lang === "mk" ? "Отвори модел" : "Open model"} ${model}`} onClick={() => setSelected(src)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(src); } }}>
            <div className="catalog-card-image"><Image src={localizedSrc} alt={model} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 20vw"/><button type="button" className="favorite active" onClick={(event) => { event.stopPropagation(); toggleFavorite(model); }} aria-label={lang === "mk" ? "Отстрани од омилени" : "Remove from favorites"}><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg></button></div>
            <div className="catalog-card-copy"><b>{model}</b><small>{lang === "mk" ? "Декоративна гипсена цигла" : "Decorative gypsum brick"}</small><span><strong>{lang === "mk" ? "56 парчиња / m²" : "56 pieces / m²"}</strong><i>→</i></span></div>
          </article>;
        })}
      </div> : <div className="favorites-empty"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg><h2>{lang === "mk" ? "Сè уште немате омилени модели" : "You do not have favorite models yet"}</h2><Link href="/catalog" className="gold-button">{lang === "mk" ? "РАЗГЛЕДАЈ КАТАЛОГ" : "VIEW CATALOG"}</Link></div>}
    </div>
    <Footer />
    {selected && selectedIndex >= 0 && <ImageModal src={lang === "en" ? `/images/en/${imageName(selected)}.webp` : selected} alt={imageName(selected)} onClose={closePreview} onPrevious={previousPreview} onNext={nextPreview} currentPosition={selectedIndex + 1} total={savedImages.length}/>} 
  </main>;
}
