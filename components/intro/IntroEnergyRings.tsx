"use client";

import { motion } from "framer-motion";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

const RINGS = [
  { size: 180, border: 1.5, duration: 12, opacity: 0.9, color: "#E8C4A0", reverse: false },
  { size: 240, border: 1.2, duration: 9, opacity: 0.75, color: "#E8A838", reverse: true },
  { size: 300, border: 1, duration: 7, opacity: 0.6, color: "#C87941", reverse: false },
  { size: 360, border: 0.8, duration: 5, opacity: 0.45, color: "#C87941", reverse: true },
  { size: 420, border: 0.6, duration: 4, opacity: 0.3, color: "#E8C4A0", reverse: false },
];

export default function IntroEnergyRings() {
  const stage = useIntro((s) => s.stage);
  const handProgress = useIntro((s) => s.handProgress);
  const ringIntensity = useIntro((s) => s.ringIntensity);
  const blastFlash = useIntro((s) => s.blastFlash);

  const show =
    stage >= INTRO_STAGES.ENERGY_CORE &&
    stage <= INTRO_STAGES.NAME_REVEAL;

  if (!show) return null;

  const approachBoost = stage >= INTRO_STAGES.HANDS_APPROACH ? handProgress : 0;
  const blastScale = stage === INTRO_STAGES.TOUCH_BLAST ? 1 + blastFlash * 0.8 : 1;
  const masterOpacity = Math.min(
    1,
    ringIntensity * (stage >= INTRO_STAGES.TOUCH_BLAST ? 1 - blastFlash * 0.4 : 1)
  );

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 15, perspective: "1200px", opacity: masterOpacity }}
    >
      {/* Central energy core */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          width: 80 + approachBoost * 60,
          height: 80 + approachBoost * 60,
          scale: blastScale,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle, rgba(232,196,160,${0.5 + approachBoost * 0.4}) 0%, rgba(200,121,65,0.15) 45%, transparent 70%)`,
          boxShadow: `0 0 ${40 + approachBoost * 80}px rgba(232,168,56,${0.4 + approachBoost * 0.5})`,
        }}
      />

      {/* Rotating rings */}
      {RINGS.map((ring, i) => {
        const speed = ring.duration / (1 + approachBoost * 1.5);
        const w = ring.size * (1 + approachBoost * 0.12) * blastScale;
        const h = ring.size * 0.35 * (1 + approachBoost * 0.08);

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: w,
              height: h,
              border: `${ring.border}px solid ${ring.color}`,
              opacity: ring.opacity * (0.5 + ringIntensity * 0.5),
              boxShadow: `0 0 ${12 + approachBoost * 20}px ${ring.color}50`,
              transform: "rotateX(72deg)",
            }}
            animate={{ rotateZ: ring.reverse ? -360 : 360 }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          />
        );
      })}

      {/* Energy bridge between hands */}
      {stage >= INTRO_STAGES.HANDS_ENTER && (
        <motion.div
          className="absolute h-px"
          animate={{
            width: `${28 + approachBoost * 28}%`,
            opacity: 0.3 + approachBoost * 0.6,
          }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(232,196,160,0.8), transparent)",
            boxShadow: `0 0 ${10 + approachBoost * 25}px rgba(232,168,56,0.7)`,
          }}
        />
      )}
    </div>
  );
}
