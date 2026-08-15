"use client";

import { motion } from "framer-motion";

export default function ScanLines() {
  return (
    <>
      {/* Moving Scan Beam */}

      <motion.div
        animate={{
          y: [-260, 260],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,

          height: 90,

          background:
            "linear-gradient(180deg,transparent,rgba(232,168,56,.45),rgba(255,255,255,.85),rgba(232,168,56,.45),transparent)",

          filter: "blur(12px)",

          zIndex: 50,

          mixBlendMode: "screen",
        }}
      />

      {/* Thin Scan Line */}

      <motion.div
        animate={{
          y: [-260, 260],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",

          left: 0,
          right: 0,

          height: 2,

          background: "#8be9ff",

          boxShadow:
            "0 0 10px #E8A838,0 0 25px #E8A838",

          zIndex: 60,
        }}
      />

      {/* Glass Reflection */}

      <motion.div
        animate={{
          x: [-250, 250],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",

          top: 0,
          bottom: 0,

          width: 80,

          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)",

          transform: "skewX(-25deg)",

          filter: "blur(10px)",

          zIndex: 40,
        }}
      />

      {/* HUD Grid */}

      <div
        style={{
          position: "absolute",
          inset: 0,

          backgroundImage: `
            linear-gradient(rgba(232,168,56,.12) 1px,transparent 1px),
            linear-gradient(90deg,rgba(232,168,56,.12) 1px,transparent 1px)
          `,

          backgroundSize: "18px 18px",

          zIndex: 20,
        }}
      />
    </>
  );
}