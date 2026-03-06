"use client";

import Image from "next/image";

type ImageCardProps = {
  src: string;
  alt: string;
  onClick: () => void;
};

export default function ImageCard({ src, alt, onClick }: ImageCardProps) {
  return (
    <div className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-lg shadow-black/40 ring-1 ring-white/0 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 hover:ring-white/10">
      <button
        type="button"
        className="absolute inset-0 z-10 h-full w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/25"
        onClick={onClick}
        aria-label={`View ${alt}`}
      />

      {/* Image — scale + brightness on hover */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover brightness-90 transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-100"
      />

      {/* Directional overlay: deepens corners, lifts centre on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />

      {/* Bottom gradient + name label — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 z-[5] translate-y-1 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pb-4 pt-14 opacity-80 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 transition-colors duration-300 group-hover:text-white">
          {alt}
        </p>
      </div>
    </div>
  );
}
