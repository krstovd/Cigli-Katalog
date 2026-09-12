"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";

const SECTION_TITLE: Record<Lang, string> = {
  mk: "Нашите модели",
  en: "Our models",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type GalleryProps = { images: string[] };

function altFromPath(path: string): string {
  const name = path.replace(/^\/images\//, "").replace(/\.webp$/i, "");
  return name;
}

function localizedImagePath(path: string, lang: Lang): string {
  if (lang === "mk") return path;
  return path.replace(/^\/images\//, "/images/en/");
}

export default function Gallery({ images }: GalleryProps) {
  const { lang } = useLang();
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const filteredImages = useMemo(
    () =>
      images.filter((src) =>
        altFromPath(src).toLowerCase().includes(query.trim().toLowerCase())
      ),
    [images, query]
  );
  const onClose = useCallback(() => setSelected(null), []);
  const onPrevious = useCallback(() => {
    setSelected((current) => {
      if (!current) return null;
      const currentIndex = images.indexOf(current);
      const previousIndex = (currentIndex - 1 + images.length) % images.length;
      return images[previousIndex];
    });
  }, [images]);
  const onNext = useCallback(() => {
    setSelected((current) => {
      if (!current) return null;
      const currentIndex = images.indexOf(current);
      const nextIndex = (currentIndex + 1) % images.length;
      return images[nextIndex];
    });
  }, [images]);

  return (
    <>
      <section id="catalog" className="relative min-w-0 px-4 pb-32 pt-20 sm:px-6 md:px-10 md:pt-28 lg:px-14">
        {/* Subtle glass glow behind the grid */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-zinc-800/20 to-transparent" />
        <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-8 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{SECTION_TITLE[lang]}</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-light tracking-[-0.035em] text-white sm:text-4xl md:text-5xl">
            {lang === "mk" ? "Најди го моделот за твојот простор" : "Find the model for your space"}
            </h2>
          </div>
          <label className="flex min-h-12 w-full items-center rounded-full border border-white/10 bg-zinc-950/40 px-5 transition focus-within:border-white/30 lg:max-w-sm">
            <span className="sr-only">{lang === "mk" ? "Пребарај модел" : "Search models"}</span>
            <svg className="h-4 w-4 shrink-0 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <circle cx="11" cy="11" r="7" strokeWidth="1.7" />
              <path d="m20 20-4-4" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={lang === "mk" ? "Пребарај модел..." : "Search models..."}
              className="w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
            />
            <span className="whitespace-nowrap text-xs text-zinc-500">{filteredImages.length}</span>
          </label>
        </div>

        <motion.div
          key={query}
          className="mx-auto grid min-w-0 max-w-7xl grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {filteredImages.map((src) => (
            <motion.div key={src} variants={item}>
              <ImageCard
                src={localizedImagePath(src, lang)}
                alt={altFromPath(src)}
                onClick={() => setSelected(src)}
                viewLabel={lang === "mk" ? "Погледни" : "View"}
              />
            </motion.div>
          ))}
        </motion.div>
        {filteredImages.length === 0 && (
          <p className="mx-auto max-w-7xl rounded-2xl border border-dashed border-white/10 py-16 text-center text-sm text-zinc-500">
            {lang === "mk" ? "Не пронајдовме модел со тоа име." : "We couldn't find a model with that name."}
          </p>
        )}
      </section>


      <AnimatePresence>
        {selected && (
          <ImageModal
            previousSrc={localizedImagePath(images[(images.indexOf(selected) - 1 + images.length) % images.length], lang)}
            nextSrc={localizedImagePath(images[(images.indexOf(selected) + 1) % images.length], lang)}
            src={localizedImagePath(selected, lang)}
            alt={altFromPath(selected)}
            onClose={onClose}
            onPrevious={onPrevious}
            onNext={onNext}
            currentPosition={images.indexOf(selected) + 1}
            total={images.length}
          />
        )}
      </AnimatePresence>
    </>
  );
}
