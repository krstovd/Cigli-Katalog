"use client";

import Image from "next/image";

type ImageCardProps = {
  src: string;
  alt: string;
  onClick: () => void;
  viewLabel: string;
};

export default function ImageCard({ src, alt, onClick, viewLabel }: ImageCardProps) {
  return (
    <article className="group min-w-0">
      <button
        type="button"
        onClick={onClick}
        aria-label={`${viewLabel} ${alt}`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/[0.06] transition duration-300 hover:ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] group-hover:brightness-105"
        />
        <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div className="flex items-center justify-between border-b border-white/[0.07] px-1 py-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200">{alt}</h3>
        <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">{viewLabel}</span>
      </div>
    </article>
  );
}
