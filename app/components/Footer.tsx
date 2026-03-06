"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="px-6 py-16 text-center md:py-20 lg:px-16"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl border-t border-zinc-700/40 pt-12">
        <div className="flex flex-col items-center gap-5">
          {/* Small logo mark */}
          <Image
            src="/images/zmaga logo.webp"
            alt="Zmaga"
            width={80}
            height={24}
            className="h-auto w-12 object-contain opacity-25 transition-opacity duration-300 hover:opacity-40 md:w-14"
          />
          <motion.div
            className="h-px w-6 bg-zinc-700/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5 }}
          />
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600">
            © 2026 Zmaga Dekorativni Cigli. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
