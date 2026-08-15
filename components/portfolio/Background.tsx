"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <>
      {/* Main Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,

          background: `
            radial-gradient(circle at top, rgba(232,168,56,.18), transparent 40%),
            radial-gradient(circle at bottom right, rgba(200,121,65,.12), transparent 35%),
            linear-gradient(180deg,#1A1025 0%,#1F1528 50%,#141210 100%)
          `,
        }}
      >
        {/* TOP GLOW */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: -220,
            left: "50%",
            transform: "translateX(-50%)",

            width: 700,
            height: 700,

            borderRadius: "50%",

            background:
              "radial-gradient(circle, rgba(232,168,56,.35), transparent 70%)",

            filter: "blur(80px)",
          }}
        />

        {/* LEFT GLOW */}
        <motion.div
          animate={{
            x: [-30, 30, -30],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",

            left: -200,
            bottom: -120,

            width: 500,
            height: 500,

            borderRadius: "50%",

            background:
              "radial-gradient(circle, rgba(200,121,65,.18), transparent 70%)",

            filter: "blur(90px)",
          }}
        />

        {/* RIGHT GLOW */}
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",

            right: -160,
            top: "20%",

            width: 420,
            height: 420,

            borderRadius: "50%",

            background:
              "radial-gradient(circle, rgba(232,196,160,.16), transparent 70%)",

            filter: "blur(90px)",
          }}
        />

        {/* GRID */}
        <div
          style={{
            position: "absolute",
            inset: 0,

            backgroundImage: `
              linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)
            `,

            backgroundSize: "80px 80px",

            maskImage:
              "radial-gradient(circle at center, black 40%, transparent 100%)",

            opacity: 0.15,
          }}
        />

        {/* NOISE */}
        <div
          style={{
            position: "absolute",
            inset: 0,

            backgroundImage:
              "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",

            backgroundSize: "6px 6px",

            opacity: 0.04,

            mixBlendMode: "screen",
          }}
        />
      </div>
    </>
  );
}