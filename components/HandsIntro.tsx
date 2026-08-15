"use client";

import { motion } from "framer-motion";

export default function HandsIntro() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background:
          "radial-gradient(circle at center,#0b1228,#1A1025,#000)",
      }}
    >
      {/* LEFT AI HAND */}

      <motion.img
        src="/images/ai-hand-left.png"
        alt="AI Hand"
        initial={{
          x: -500,
          opacity: 0,
          rotate: -12,
        }}
        animate={{
          x: -70,
          opacity: 1,
          rotate: 0,
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          width: "420px",
          transform: "translate(-100%,-50%)",
          pointerEvents: "none",
        }}
      />

      {/* RIGHT HUMAN HAND */}

      <motion.img
        src="/images/human-hand-right.png"
        alt="Human Hand"
        initial={{
          x: 500,
          opacity: 0,
          rotate: 12,
        }}
        animate={{
          x: 70,
          opacity: 1,
          rotate: 0,
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          width: "420px",
          transform: "translate(0,-50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}