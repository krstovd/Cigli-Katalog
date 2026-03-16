"use client";

import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/app/context/LangContext";

const WHY_CONTENT: Record<Lang, { title: string; body: string }> = {
  mk: {
    title: "Зошто Zmaga?",
    body: "Секоја декоративна цигла ја произведуваме со особено внимание на квалитетот и издржливоста. Нудиме персонализиран пристап кон секој клиент и помагаме во изборот на дизајнот кој најдобро ќе го надополни вашиот ентериер.",
  },
  en: {
    title: "Why Zmaga?",
    body: "We produce each decorative brick with special attention to quality and durability. We offer a personalized approach to every client and help with choosing the design that best complements your interior.",
  },
};

export default function AboutWhy() {
  const { lang } = useLang();
  const content = WHY_CONTENT[lang];
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
