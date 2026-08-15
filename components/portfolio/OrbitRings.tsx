"use client";

import { motion } from "framer-motion";

const rings = [
  {
    size: 300,
    border: "2px solid rgba(232,168,56,.45)",
    duration: 18,
    rotateX: "70deg",
    rotateY: "0deg",
  },
  {
    size: 270,
    border: "2px solid rgba(232,196,160,.35)",
    duration: 14,
    rotateX: "0deg",
    rotateY: "70deg",
  },
  {
    size: 240,
    border: "1.5px solid rgba(96,165,250,.35)",
    duration: 10,
    rotateX: "65deg",
    rotateY: "65deg",
  },
  {
    size: 210,
    border: "1px solid rgba(180,240,255,.25)",
    duration: 8,
    rotateX: "-60deg",
    rotateY: "30deg",
  },
  {
    size: 180,
    border: "1px solid rgba(232,168,56,.30)",
    duration: 6,
    rotateX: "30deg",
    rotateY: "-70deg",
  },
  {
    size: 140,
    border: "1px solid rgba(255,255,255,.20)",
    duration: 5,
    rotateX: "-40deg",
    rotateY: "-20deg",
  },
];

export default function OrbitRings() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        perspective: "1500px",
      }}
    >
      {rings.map((ring, index) => (
        <motion.div
          key={index}
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",

            width: ring.size,
            height: ring.size,

            borderRadius: "50%",

            border: ring.border,

            transform: `rotateX(${ring.rotateX}) rotateY(${ring.rotateY})`,

            boxShadow: `
              0 0 15px rgba(232,168,56,.35),
              inset 0 0 15px rgba(232,168,56,.25)
            `,
          }}
        />
      ))}

      {/* OUTER ENERGY RING */}

      <motion.div
        animate={{
          rotateZ: [360, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",

          width: 330,
          height: 330,

          borderRadius: "50%",

          border: "1px dashed rgba(232,168,56,.18)",

          filter: "drop-shadow(0 0 10px rgba(232,168,56,.30))",
        }}
      />
    </div>
  );
}