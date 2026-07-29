"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";

const CONTENT = {
  mk: {
    eyebrow: "СЕ ПОЈАВИ ГРЕШКА",
    title: "Нешто тргна наопаку",
    description:
      "Не можевме да ја прикажеме страницата. Обидете се повторно или вратете се на почетната страница.",
    retry: "Обиди се повторно",
    home: "Назад на почетна",
  },
  en: {
    eyebrow: "AN ERROR OCCURRED",
    title: "Something went wrong",
    description:
      "We could not display this page. Please try again or return to the home page.",
    retry: "Try again",
    home: "Back to home",
  },
} as const;

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { lang } = useLang();
  const content = CONTENT[lang];

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-16 pt-28 text-center sm:px-6">
      <motion.div
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950/35 px-6 py-16 shadow-2xl shadow-black/20 backdrop-blur-sm sm:px-12 sm:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-1.5a9 9 0 11-18 0 9 9 0 0118 0zM12 16.5h.008v.008H12V16.5z" />
          </svg>
        </div>
        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-light tracking-wide text-white sm:text-4xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
          {content.description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 min-w-48 items-center justify-center rounded-full bg-white px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {content.retry}
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-48 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {content.home}
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
