"use client";

import Image from "next/image";
import { useCallback, useDeferredValue, useMemo, useState } from "react";
import Footer from "@/app/components/Footer";
import ImageModal from "@/app/components/ImageModal";
import { useLang } from "@/app/context/LangContext";
import { useFavorites } from "@/app/hooks/useFavorites";

const PAGE_SIZE = 10;
const imageName = (src: string) => src.split("/").pop()!.replace(/\.webp$/i, "");
type View = "grid" | "list";

export default function CatalogClient({ images }: { images: string[] }) {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("az");
  const [view, setView] = useState<View>("grid");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());

  const filtered = useMemo(() => {
    const result = images.filter((src) => {
      const model = imageName(src);
      return model.toLocaleLowerCase().includes(deferredQuery);
    });
    return result.sort((a, b) => sort === "za" ? imageName(b).localeCompare(imageName(a)) : imageName(a).localeCompare(imageName(b)));
  }, [images, deferredQuery, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const selectedIndex = selected ? filtered.indexOf(selected) : -1;
  const closePreview = useCallback(() => setSelected(null), []);
  const previousPreview = useCallback(() => setSelected((current) => {
    const index = current ? filtered.indexOf(current) : -1;
    return filtered[(index - 1 + filtered.length) % filtered.length] ?? null;
  }), [filtered]);
  const nextPreview = useCallback(() => setSelected((current) => {
    const index = current ? filtered.indexOf(current) : -1;
    return filtered[(index + 1) % filtered.length] ?? null;
  }), [filtered]);

  const labels = lang === "mk" ? {
    title: "Каталог", intro: "Откријте ја нашата колекција на декоративни гипсени цигли со различни текстури, бои и стилови.",
    search: "Пребарај модели...",
    sort: "Сортирај:", newest: "А–Ш", reverse: "Ш–А", show: "Прикажи:", description: "Декоративна гипсена цигла", unit: "60 парчиња / m²",
    empty: "Не пронајдовме модел според избраните критериуми.", favorite: "Додај во омилени", previous: "Претходна страница", next: "Следна страница",
  } : {
    title: "Catalog", intro: "Discover our collection of decorative gypsum bricks in a range of textures, colors and styles.",
    search: "Search models...",
    sort: "Sort:", newest: "A–Z", reverse: "Z–A", show: "View:", description: "Decorative gypsum brick", unit: "60 pieces / m²",
    empty: "No models match the selected criteria.", favorite: "Add to favorites", previous: "Previous page", next: "Next page",
  };
  return <main className="catalog-page">
    <section className="catalog-hero"><div className="catalog-hero-copy"><h1>{labels.title}</h1><p>{labels.intro}</p></div></section>
    <div className="catalog-shell">
      <div className="catalog-toolbar">
        <label className="catalog-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={labels.search} aria-label={labels.search}/></label>
        <div className="catalog-controls">
          <label className="catalog-sort"><span>{labels.sort}</span><select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }}><option value="az">{labels.newest}</option><option value="za">{labels.reverse}</option></select></label>
          <div className="view-switch"><span>{labels.show}</span><button type="button" className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Grid view"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button><button type="button" className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="List view"><svg viewBox="0 0 24 24"><path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg></button></div>
        </div>
      </div>
      <div className={`catalog-grid catalog-${view}`}>
        {visible.map((src) => {
          const model = imageName(src);
          const localizedSrc = lang === "en" ? `/images/en/${model}.webp` : src;
          const liked = favorites.includes(model);
          return <article className="catalog-card" key={src} role="button" tabIndex={0} aria-label={`${lang === "mk" ? "Отвори модел" : "Open model"} ${model}`} onClick={() => setSelected(src)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(src); } }}>
            <div className="catalog-card-image"><Image src={localizedSrc} alt={model} fill sizes={view === "grid" ? "(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 20vw" : "260px"}/><button type="button" className={liked ? "favorite active" : "favorite"} onClick={(event) => { event.stopPropagation(); toggleFavorite(model); }} aria-label={labels.favorite} aria-pressed={liked}><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg></button></div>
            <div className="catalog-card-copy"><b>{model}</b><small>{labels.description}</small><span><strong>{labels.unit}</strong><i>→</i></span></div>
          </article>;
        })}
        {!visible.length && <p className="catalog-empty">{labels.empty}</p>}
      </div>
      {pageCount > 1 && <nav className="catalog-pagination" aria-label="Pagination"><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={safePage === 1} aria-label={labels.previous}>←</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button type="button" key={number} className={safePage === number ? "active" : ""} onClick={() => setPage(number)}>{number}</button>)}<button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={safePage === pageCount} aria-label={labels.next}>→</button></nav>}
    </div>
    <Footer />
    {selected && selectedIndex >= 0 && <ImageModal src={lang === "en" ? `/images/en/${imageName(selected)}.webp` : selected} alt={imageName(selected)} onClose={closePreview} onPrevious={previousPreview} onNext={nextPreview} currentPosition={selectedIndex + 1} total={filtered.length}/>} 
  </main>;
}
