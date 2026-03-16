"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const HERO_CONTENT: Record<
  Lang,
  { subtitle: string; title: string; paragraph: string }
> = {
  mk: {
    subtitle: "ЗА НАС",
    title: "Змага Декоративни Цигли",
    paragraph:
      "Нудиме каталог со декоративни цигли кои се користат за модерна и традиционална архитектура. Нашата цел е да им помогнеме на клиентите полесно да го изберат вистинскиот модел за нивниот дом.",
  },
  en: {
    subtitle: "ABOUT US",
    title: "Zmaga Decorative Bricks",
    paragraph:
      "We offer a catalog of decorative bricks used for modern and traditional architecture. Our goal is to help clients more easily choose the right model for their home.",
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutHero() {
  const { lang } = useLang();
  const content = HERO_CONTENT[lang];

  return (
    <section className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden border-b-0 md:min-h-[70vh]">
      {/* Background image */}
      <Image
        src="/images/hero-section.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay — subtle, brick texture visible */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Bottom fade — smooth transition */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 md:h-80"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(39,39,42,0.4) 40%, var(--section-bg) 100%)",
        }}
      />

      {/* Content — centered with visual interest */}
      <motion.div
        className="relative z-10 flex w-full min-w-0 max-w-full flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 md:py-24"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col items-center gap-4" variants={item}>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400 sm:tracking-[0.5em]">
            {content.subtitle}
          </p>
        </motion.div>

        <motion.h1
          className="mt-5 text-4xl font-light tracking-[0.02em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)] md:text-6xl md:leading-tight"
          variants={item}
        >
          {content.title}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl break-words text-sm leading-relaxed text-zinc-400 sm:text-base md:max-w-2xl md:leading-7"
          variants={item}
        >
          {content.paragraph}
        </motion.p>
      </motion.div>
    </section>
  );
}
