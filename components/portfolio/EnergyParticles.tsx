"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 80 }).map((_, i) => ({
  id: i,

  size: Math.random() * 6 + 2,

  x: Math.random() * 520 - 260,

  y: Math.random() * 520 - 260,

  duration: Math.random() * 6 + 4,

  delay: Math.random() * 3,

  opacity: Math.random() * 0.6 + 0.3,
}));

export default function EnergyParticles() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        pointerEvents: "none",

        overflow: "visible",
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            x: [
              p.x,
              p.x + (Math.random() * 40 - 20),
              p.x,
            ],

            y: [
              p.y,
              p.y + (Math.random() * 40 - 20),
              p.y,
            ],

            opacity: [
              p.opacity,
              1,
              p.opacity,
            ],

            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          style={{
            position: "absolute",

            width: p.size,
            height: p.size,

            borderRadius: "50%",

            background: "#E8C4A0",

            boxShadow: `
              0 0 8px #E8C4A0,
              0 0 16px #E8A838,
              0 0 30px #C87941
            `,

            filter: "blur(.3px)",
          }}
        />
      ))}

      {/* Energy Dust */}

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",

          width: 500,
          height: 500,

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(232,168,56,.08), transparent 70%)",

          filter: "blur(30px)",
        }}
      />
    </div>
  );
}