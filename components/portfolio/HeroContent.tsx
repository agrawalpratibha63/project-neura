"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content/portfolio";
import CTAButtons from "./CTAButtons";
import HeroVisual from "./HeroVisual";
import GestureFeatureBadge from "@/components/vision/GestureFeatureBadge";

export default function HeroContent() {
  return (
    <section className="absolute inset-0 flex items-center justify-between px-[8%] z-20 flex-col lg:flex-row gap-8 pt-24 lg:pt-0">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-[600px] text-center lg:text-left"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-cream text-lg lg:text-xl font-medium m-0"
        >
          {hero.greeting}
        </motion.h3>

        <GestureFeatureBadge />

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-orbitron text-5xl lg:text-6xl font-black leading-tight mt-2 mb-3 text-white"
        >
          {hero.headline[0]}
          <br />
          {hero.headline[1]}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl lg:text-2xl font-semibold text-[#E8C4A0] mb-8"
        >
          {hero.role}
        </motion.h2>

        <CTAButtons />
      </motion.div>

      <div className="hidden lg:flex w-[38%] justify-center items-center">
        <HeroVisual />
      </div>
    </section>
  );
}
