"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 140 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 5,
}));

export default function NeuralBackground() {
  return (
    <>
      {/* Base Glow */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 50% 50%,
              rgba(232,168,56,.08),
              transparent 55%)
            `,
          }}
        />

        {/* GRID */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(232,168,56,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,168,56,.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: .3,
          }}
        />

        {/* PARTICLES */}

        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [-20, 20, -20],
              opacity: [.2, 1, .2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,

              width: p.size,
              height: p.size,

              borderRadius: "50%",

              background: "#E8C4A0",

              boxShadow:
                "0 0 12px #E8A838",
            }}
          />
        ))}

        {/* MOVING LIGHT */}

        <motion.div
          animate={{
            x: ["-30%", "130%"],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",

            width: 450,
            height: "180%",

            top: "-40%",
            left: "-30%",

            transform: "rotate(-25deg)",

            background:
              "linear-gradient(to right,transparent,rgba(232,168,56,.12),transparent)",

            filter: "blur(50px)",
          }}
        />

        <motion.div
          animate={{
            x: ["130%", "-30%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",

            width: 350,
            height: "180%",

            top: "-40%",
            right: "-30%",

            transform: "rotate(18deg)",

            background:
              "linear-gradient(to right,transparent,rgba(200,121,65,.10),transparent)",

            filter: "blur(60px)",
          }}
        />
      </div>
    </>
  );
}