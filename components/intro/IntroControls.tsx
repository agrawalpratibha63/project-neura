"use client";

import { motion } from "framer-motion";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";
import { siteMeta } from "@/lib/content/portfolio";

const nameParts = siteMeta.name.split(" ");

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const wordAnim = {
  hidden: { opacity: 0, y: -50, rotateX: -40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function NameReveal() {
  const stage = useIntro((s) => s.stage);

  if (stage !== INTRO_STAGES.NAME_REVEAL) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center"
      style={{ paddingTop: "8%", perspective: "800px" }}
    >
      {/* Glow behind name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.6, 0.4], scale: [0.5, 1.2, 1] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 200,
          top: "6%",
          background: "radial-gradient(ellipse, rgba(232,168,56,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Name — word by word */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap justify-center gap-x-4"
      >
        {nameParts.map((word, i) => (
          <motion.h1
            key={i}
            variants={wordAnim}
            className="font-orbitron text-white font-black tracking-wide"
            style={{
              fontSize: "clamp(40px, 6vw, 88px)",
              textShadow: "0 0 20px #E8C4A0, 0 0 60px #E8A838, 0 0 120px #C87941",
            }}
          >
            {word}
          </motion.h1>
        ))}
      </motion.div>

      {/* Animated divider line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        className="h-px w-40 mt-6 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, #E8A838, #E8C4A0, #E8A838, transparent)",
          boxShadow: "0 0 20px rgba(232,168,56,0.5)",
        }}
      />

      {/* Role — letter spacing expand */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: "24px", y: 10 }}
        animate={{ opacity: 1, letterSpacing: "8px", y: 0 }}
        transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
        className="font-orbitron mt-5 text-center text-cream uppercase"
        style={{
          fontSize: "clamp(14px, 2.2vw, 26px)",
          textShadow: "0 0 30px rgba(232,168,56,0.6)",
        }}
      >
        AI / ML Student
      </motion.p>

      {/* Subtle pulsing underline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.3], scaleX: [0.5, 1, 0.8] }}
        transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="h-px w-24 mt-4 bg-saffron/40"
      />
    </motion.div>
  );
}

export function IntroControls() {
  const stage = useIntro((s) => s.stage);
  const skipToPortfolio = useIntro((s) => s.skipToPortfolio);

  const handleSkip = () => {
    skipToPortfolio();
    sessionStorage.setItem("neura-intro-seen", "true");
  };

  if (stage >= INTRO_STAGES.PORTFOLIO) return null;

  return (
    <>
      {stage > INTRO_STAGES.SEARCH && (
        <motion.button
          type="button"
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 right-6 z-[100] text-zinc-500 hover:text-saffron text-xs tracking-wider uppercase transition-colors"
        >
          Skip
        </motion.button>
      )}
    </>
  );
}
