"use client";

import { motion } from "framer-motion";

export default function ReactorCore() {
  return (
    <div
      style={{
        position: "relative",
        width: 360,
        height: 360,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* OUTER GLOW */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,168,56,.28), transparent 72%)",
          filter: "blur(70px)",
        }}
      />

      {/* GLASS SPHERE */}

      <motion.div
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 25%,rgba(255,255,255,.22),rgba(40,80,120,.22),rgba(0,0,0,.08))",

          border: "1px solid rgba(120,220,255,.30)",

          backdropFilter: "blur(22px)",

          boxShadow: `
            inset 0 0 60px rgba(255,255,255,.08),
            inset 0 0 120px rgba(232,168,56,.08),
            0 0 90px rgba(232,168,56,.22)
          `,
        }}
      />

      {/* INNER ENERGY */}

      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.65, 1, 0.65],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: 110,
          height: 110,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#ffffff,#6fd8ff 35%,#14b8ff 70%,transparent)",

          filter: "blur(3px)",

          boxShadow: `
            0 0 40px #E8A838,
            0 0 80px #E8A838,
            0 0 160px #C87941
          `,
        }}
      />

      {/* CORE */}

      <motion.div
        animate={{
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "#ffffff",

          boxShadow: `
            0 0 30px white,
            0 0 70px #E8C4A0,
            0 0 130px #E8A838
          `,
        }}
      />
    </div>
  );
}