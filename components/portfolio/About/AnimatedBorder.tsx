"use client";

import { motion } from "framer-motion";

export default function AnimatedBorder() {
  return (
    <>
      {/* ROTATING OUTER BORDER */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          inset: -2,

          borderRadius: 36,

          background: `
            conic-gradient(
              from 0deg,
              transparent,
              rgba(232,168,56,.9),
              rgba(232,196,160,.7),
              transparent,
              rgba(232,168,56,.9),
              transparent
            )
          `,

          filter: "blur(10px)",

          opacity: 0.9,

          zIndex: 0,
        }}
      />

      {/* INNER BORDER */}

      <div
        style={{
          position: "absolute",
          inset: 1,

          borderRadius: 34,

          border: "1px solid rgba(232,196,160,.18)",

          zIndex: 1,

          pointerEvents: "none",
        }}
      />

      {/* MOVING LIGHT */}

      <motion.div
        animate={{
          left: ["-30%", "110%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",

          top: 0,
          bottom: 0,

          width: 140,

          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)",

          transform: "skewX(-25deg)",

          filter: "blur(12px)",

          zIndex: 2,

          pointerEvents: "none",
        }}
      />
    </>
  );
}