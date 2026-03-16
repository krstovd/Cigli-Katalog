"use client";

import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const PRODUCTS_CONTENT: Record<Lang, { title: string; body: string }> = {
  mk: {
    title: "Нашите производи",
    body: "Нашиот каталог содржи повеќе од 47 различни дизајни на декоративни гипсени цигли. Од класични текстури до модерни апстрактни мотиви, секој производ е изработен од висококвалитетен гипс и е лесен за монтажа и одржување.",
  },
  en: {
    title: "Our Products",
    body: "Our catalog contains over 47 different designs of decorative gypsum bricks. From classic textures to modern abstract motifs, each product is made from high-quality gypsum and is easy to install and maintain.",
  },
};

export default function AboutProducts() {
  const { lang } = useLang();
  const content = PRODUCTS_CONTENT[lang];
  return (
    <section className="px-4 py-12 sm:px-6 md:py-14">
      <motion.div
        className="mx-auto min-w-0 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 border-t border-zinc-700/40 pt-10" />
        <h2 className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">
          {content.title}
        </h2>
        <p className="break-words text-sm leading-relaxed text-zinc-400 sm:text-base">
          {content.body}
        </p>
      </motion.div>
    </section>
  );
}
