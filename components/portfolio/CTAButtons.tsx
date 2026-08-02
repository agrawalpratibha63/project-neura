"use client";

import { motion } from "framer-motion";
import { hero, siteMeta } from "@/lib/content/portfolio";

export default function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="flex flex-wrap gap-4 justify-center lg:justify-start"
    >
      <a
        href={hero.ctaPrimary.href}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-saffron text-white font-semibold text-base hover:scale-105 transition-transform"
        style={{ boxShadow: "0 0 25px rgba(232,168,56,.35)" }}
      >
        {hero.ctaPrimary.label}
      </a>
      <a
        href={hero.ctaSecondary.href}
        className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-base hover:border-copper/50 hover:text-saffron transition-colors"
      >
        {hero.ctaSecondary.label}
      </a>
      <a
        href={siteMeta.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 rounded-xl border border-copper/30 text-saffron font-semibold text-base hover:bg-saffron/10 transition-colors"
      >
        Resume ↓
      </a>
    </motion.div>
  );
}
