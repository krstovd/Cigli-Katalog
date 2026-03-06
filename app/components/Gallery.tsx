"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type GalleryProps = { images: string[] };

function altFromPath(path: string): string {
  const name = path.replace(/^\/images\//, "").replace(/\.webp$/i, "");
  return name;
}

export default function Gallery({ images }: GalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const onClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <section className="relative px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:px-10 md:pt-10 lg:px-14">
        {/* Subtle glass glow behind the grid */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-zinc-800/20 to-transparent" />
        {/* Section divider */}
        <motion.div
          className="mx-auto mb-8 max-w-7xl border-t border-zinc-700/30 md:mb-12"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />

        <motion.div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {images.map((src) => (
            <motion.div key={src} variants={item}>
              <ImageCard
                src={src}
                alt={altFromPath(src)}
                onClick={() => setSelected(src)}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>


      <AnimatePresence>
        {selected && (
          <ImageModal
            src={selected}
            alt={altFromPath(selected)}
            onClose={onClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
