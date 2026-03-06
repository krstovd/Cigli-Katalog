"use client";

import { useEffect } from "react";
import Image from "next/image";

type ImageModalProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-sm"
        aria-hidden
      />

      {/* Image container */}
      <div
        className="relative z-10 max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={900}
          className="max-h-[90vh] w-auto rounded-xl object-contain shadow-2xl"
        />

        {/* Image name label */}
        <p className="mt-4 text-center text-[10px] uppercase tracking-[0.35em] text-white/40">
          {alt}
        </p>
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 md:right-7 md:top-7"
        aria-label="Close"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
