"use client";

import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const FEATURES_MK = [
  {
    id: "quality",
    title: "Квалитетни материјали",
    body: "Нашите декоративни цигли се изработени од висококвалитетен гипс кој обезбедува издржливост и естетика.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "design",
    title: "Модерен дизајн",
    body: "Нудиме различни модели кои лесно се вклопуваат во современи и класични ентериери.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-1.5-18H4.5" />
      </svg>
    ),
  },
  {
    id: "install",
    title: "Лесна монтажа",
    body: "Производите се лесни за поставување и одржување.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

const FEATURES_EN = [
  {
    id: "quality",
    title: "Quality Materials",
    body: "Our decorative bricks are made from high-quality gypsum that ensures durability and aesthetics.",
    icon: FEATURES_MK[0].icon,
  },
  {
    id: "design",
    title: "Modern Design",
    body: "We offer various models that easily fit into modern and classic interiors.",
    icon: FEATURES_MK[1].icon,
  },
  {
    id: "install",
    title: "Easy Installation",
    body: "The products are easy to install and maintain.",
    icon: FEATURES_MK[2].icon,
  },
];

const FEATURES: Record<Lang, typeof FEATURES_MK> = { mk: FEATURES_MK, en: FEATURES_EN };

export default function AboutFeatures() {
  const { lang } = useLang();
  const features = FEATURES[lang];
  return (
    <section className="px-4 py-12 sm:px-6 md:py-14">
      <div className="mx-auto min-w-0 max-w-6xl">
        <motion.div
          className="grid gap-6 md:grid-cols-3 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-700/80 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] sm:p-8"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {/* Icon container */}
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-300">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500">{feature.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
