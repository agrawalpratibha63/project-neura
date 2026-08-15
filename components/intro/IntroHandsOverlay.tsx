"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

const HAND_W = "min(760px, 52vw)";
const HAND_H = "min(460px, 32vw)";

export default function IntroHandsOverlay() {
  const stage = useIntro((s) => s.stage);
  const handProgress = useIntro((s) => s.handProgress);

  const show = stage >= INTRO_STAGES.HANDS_ENTER && stage <= INTRO_STAGES.TOUCH_BLAST;
  if (!show) return null;

  const isApproaching = stage >= INTRO_STAGES.HANDS_APPROACH;
  const progress = isApproaching ? handProgress : 0;

  // Start apart, converge to fingertips touching at center
  const aiMarginLeft = isApproaching ? -760 + progress * 750 : undefined;
  const humanMarginLeft = isApproaching ? 10 - progress * 10 : undefined;

  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      {/* AI hand — left */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: HAND_W,
          height: HAND_H,
          marginTop: "-120px",
          zIndex: 20,
          ...(isApproaching ? { marginLeft: aiMarginLeft } : {}),
        }}
        initial={{ opacity: 0, marginLeft: -900 }}
        animate={
          isApproaching
            ? { opacity: 1 }
            : { opacity: 1, marginLeft: -760 }
        }
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image src="/images/ai-hand-left.png" alt="" fill priority className="object-contain" />
      </motion.div>

      {/* Human hand — right */}
      <motion.div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: HAND_W,
          height: HAND_H,
          marginTop: "-120px",
          zIndex: 20,
          ...(isApproaching ? { marginLeft: humanMarginLeft } : {}),
        }}
        initial={{ opacity: 0, marginLeft: 900 }}
        animate={
          isApproaching
            ? { opacity: 1 }
            : { opacity: 1, marginLeft: 10 }
        }
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/images/human-hand-right.png"
          alt=""
          fill
          priority
          className="object-contain"
          style={{ transform: "scaleX(-1)" }}
        />
      </motion.div>

      {/* Spark on touch */}
      {(stage === INTRO_STAGES.TOUCH_BLAST || progress > 0.92) && (
        <motion.div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: "min(500px, 40vw)",
            height: "min(500px, 40vw)",
            marginLeft: "-250px",
            marginTop: "-250px",
            zIndex: 30,
          }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Image src="/images/spark.png" alt="" fill priority className="object-contain" />
        </motion.div>
      )}
    </div>
  );
}
