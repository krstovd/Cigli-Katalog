"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const STORY_CONTENT: Record<Lang, { title: string; body: string }> = {
  mk: {
    title: "Нашата приказна",
    body: "Змага е бренд кој создава декоративни гипсени цигли со цел да донесе топлина и карактер во секој простор. Нашите производи комбинираат традиционална изработка со модерен дизајн, создавајќи уникатен изглед за секој дом или деловен простор.",
  },
  en: {
    title: "Our Story",
    body: "Zmaga is a brand that creates decorative gypsum bricks to bring warmth and character to every space. Our products combine traditional craftsmanship with modern design, creating a unique look for every home or business space.",
  },
};

export default function AboutStory() {
  const { lang } = useLang();
  const content = STORY_CONTENT[lang];
  return (
    <section className="relative mt-2 min-w-0 border-t-0 px-4 pb-12 pt-2 sm:px-6 md:mt-16 md:px-10 md:pb-14 md:pt-8">
      <div className="mx-auto min-w-0 max-w-6xl">
        <motion.div
          className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-stretch md:gap-12 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.08 },
            },
          }}
        >
          {/* Image — no top margin on desktop so it aligns with card */}
          <motion.div
            className="group relative mt-2 aspect-[4/3] min-w-0 overflow-hidden rounded-2xl md:mt-0"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <Image
              src="/images/story-interior.png"
              alt={lang === "mk" ? "Интериер со декоративни цигли" : "Interior with decorative bricks"}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle gradient overlay on bottom edge */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent"
              aria-hidden
            />
            {/* Border */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" aria-hidden />
          </motion.div>

          {/* Text — same aspect ratio as image on desktop for symmetry */}
          <motion.div
            className="relative flex min-w-0 flex-col justify-center rounded-2xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/40 to-zinc-950/60 px-6 py-8 md:aspect-[4/3] md:min-h-0 md:px-8 md:py-10"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
            <div className="mb-6 flex flex-col gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-zinc-500 to-transparent" />
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
                {content.title}
              </h2>
            </div>
            <p className="break-words text-sm leading-relaxed text-zinc-300 sm:text-base md:leading-7">
              {content.body}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
