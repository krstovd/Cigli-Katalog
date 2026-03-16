"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const HERO_CONTENT: Record<
  Lang,
  { label: string; title: string; tagline: string }
> = {
  mk: {
    label: "КАТАЛОГ",
    title: "ДЕКОРАТИВНИ ГИПСЕНИ ЦИГЛИ",
    tagline: "ЗМАГА ДЕКОРАТИВНИ ЦИГЛИ",
  },
  en: {
    label: "Catalog",
    title: "DECORATIVE GYPSUM BRICKS",
    tagline: "ZMAGA DECORATIVE BRICKS",
  },
};

export default function Hero() {
  const { lang } = useLang();
  const content = HERO_CONTENT[lang];

  return (
    <motion.header
      className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-14 text-center sm:px-6 md:min-h-[75vh] md:pt-28 md:pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Modern gradient background */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(63,63,70,0.4) 0%, transparent 50%), linear-gradient(to bottom, rgba(24,24,27,0.95) 0%, transparent 40%, transparent 70%, rgba(39,39,42,0.3) 100%)",
        }}
      />
      {/* Text block — scroll reveal + language switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          className="w-full min-w-0 max-w-2xl space-y-6 px-1 lg:max-w-3xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          viewport={{ once: false, margin: "-8%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="h-px w-10 bg-zinc-600"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: false, margin: "-8%" }}
              transition={{ duration: 1.0, delay: 0.25, ease: "easeOut" }}
              style={{ originX: 0.5 }}
            />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500 sm:tracking-[0.5em]">
              {content.label}
            </p>
          </div>

          <h1 className="text-3xl font-extralight leading-tight tracking-[0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.title}
          </h1>

          <div className="flex flex-col items-center gap-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 sm:text-base sm:tracking-[0.3em]">
              {content.tagline}
            </p>
            <motion.div
              className="h-px w-10 bg-zinc-700"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: false, margin: "-8%" }}
              transition={{ duration: 1.0, delay: 0.35, ease: "easeOut" }}
              style={{ originX: 0.5 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.header>
  );
}
