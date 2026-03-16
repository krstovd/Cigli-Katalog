"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const STATS: Record<Lang, { number: string; label: string }[]> = {
  mk: [
    { number: "12+", label: "Години искуство" },
    { number: "800+", label: "Завршени проекти" },
    { number: "500+", label: "Задоволни клиенти" },
  ],
  en: [
    { number: "12+", label: "Years of experience" },
    { number: "800+", label: "Completed projects" },
    { number: "500+", label: "Satisfied clients" },
  ],
};

const CTA_CONTENT: Record<
  Lang,
  { text: string; button: string; subtext: string }
> = {
  mk: {
    text: "Дали барате декоративни цигли за вашиот простор?",
    button: "Погледни каталог",
    subtext: "Прегледајте ги нашите 47+ модели и најдете го совршениот изглед",
  },
  en: {
    text: "Looking for decorative bricks for your space?",
    button: "View catalog",
    subtext: "Browse our 47+ models and find the perfect look",
  },
};

function CountUp({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1800;
    const start = performance.now();

    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(update);
  }, [inView, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function AboutCTA() {
  const { lang } = useLang();
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-60px" });
  const stats = STATS[lang];
  const cta = CTA_CONTENT[lang];

  return (
    <section className="px-4 py-14 sm:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Stats strip */}
        <motion.div
          ref={statsRef}
          className="mb-12 grid grid-cols-3 gap-4 rounded-2xl border border-[#2a2a2a] bg-[#1e1e1e] p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((stat) => {
            const match = stat.number.match(/^(\d+)(\+?)$/);
            const target = match ? parseInt(match[1], 10) : 0;
            const suffix = match ? match[2] : "";
            return (
              <div key={stat.label} className="text-center">
                <p
                  className="font-sans text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
                >
                  <CountUp target={target} suffix={suffix} inView={isInView} />
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="relative min-w-0 overflow-hidden rounded-2xl border border-zinc-800/60 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 px-6 py-10 text-center sm:px-10 sm:py-12 md:px-14 md:py-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {/* Decorative icon */}
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <svg className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="relative mb-2 text-xl font-medium text-white sm:text-2xl md:text-3xl md:leading-tight">
            {cta.text}
          </p>
          <p className="mb-8 text-sm text-zinc-500">
            {cta.subtext}
          </p>
          <Link
            href="/#catalog"
            className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.02] hover:border-white/40 hover:bg-white hover:text-zinc-900 hover:shadow-[0_0_28px_rgba(255,255,255,0.25)]"
          >
            <span>{cta.button}</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
