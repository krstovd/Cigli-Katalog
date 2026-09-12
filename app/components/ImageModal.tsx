"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ZoomableImage, { previewImageSizes } from "./ZoomableImage";
import { useLang } from "@/app/context/LangContext";

type ImageModalProps = {
  src: string;
  alt: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentPosition: number;
  total: number;
  previousSrc?: string;
  nextSrc?: string;
};

export default function ImageModal({
  src,
  alt,
  onClose,
  onPrevious,
  onNext,
  currentPosition,
  total,
  previousSrc,
  nextSrc,
}: ImageModalProps) {
  const { lang } = useLang();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "Tab") {
        const focusableElements = Array.from(
          dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []
        );
        if (focusableElements.length === 0) return;

        event.preventDefault();
        const currentIndex = focusableElements.indexOf(
          document.activeElement as HTMLButtonElement
        );
        const direction = event.shiftKey ? -1 : 1;
        const nextIndex =
          (currentIndex + direction + focusableElements.length) %
          focusableElements.length;
        focusableElements[nextIndex]?.focus();
      }
    };

    closeButtonRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-sm"
        aria-hidden
      />

      {/* Image container */}
      {/* Match the visible image's responsive request to warm the browser cache. */}
      <div className="hidden" aria-hidden="true">
        {Array.from(new Set([previousSrc, nextSrc])).filter((neighbor): neighbor is string => Boolean(neighbor) && neighbor !== src).map((neighbor) => (
          <Image key={neighbor} src={neighbor} alt="" width={1200} height={900}
            sizes={previewImageSizes} loading="eager" fetchPriority="low" />
        ))}
      </div>
      <div
        className="relative z-10 max-h-[95dvh] max-w-[90vw] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <ZoomableImage key={src} src={src} alt={alt} onPrevious={onPrevious} onNext={onNext} />

        {/* Image name label */}
        <div className="mt-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40">
          <p id="gallery-dialog-title">{alt}</p>
          <span aria-hidden>·</span>
          <span aria-label={`${currentPosition} / ${total}`}>
            {currentPosition} / {total}
          </span>
        </div>
        <p className="mt-2 text-center text-[9px] tracking-[0.12em] text-white/25">
          <span className="sm:hidden">
            {lang === "mk"
              ? "Зумирајте со два прста • Повлечете за следен модел"
              : "Pinch to zoom • Swipe to change model"}
          </span>
          <span className="hidden sm:inline">
            {lang === "mk"
              ? "Зумирајте со два прста • Стрелки ← →"
              : "Pinch to zoom • Arrow keys ← →"}
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:left-5 md:left-8"
        aria-label={lang === "mk" ? "Претходен модел" : "Previous model"}
        aria-keyshortcuts="ArrowLeft"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:right-5 md:right-8"
        aria-label={lang === "mk" ? "Следен модел" : "Next model"}
        aria-keyshortcuts="ArrowRight"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m9 6 6 6-6 6" />
        </svg>
      </button>

      {/* Close button */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 md:right-7 md:top-7"
        aria-label={lang === "mk" ? "Затвори" : "Close"}
        aria-keyshortcuts="Escape"
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
