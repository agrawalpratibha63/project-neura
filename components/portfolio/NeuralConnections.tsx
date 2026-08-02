"use client";

import { motion } from "framer-motion";

const lines = [
  { w: 240, left: "18%", top: "22%", rotate: -22 },
  { w: 180, left: "62%", top: "18%", rotate: 35 },
  { w: 210, left: "22%", top: "68%", rotate: 18 },
  { w: 170, left: "68%", top: "70%", rotate: -30 },
  { w: 260, left: "38%", top: "48%", rotate: 0 },
  { w: 200, left: "50%", top: "32%", rotate: 65 },
];

export default function NeuralConnections() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {lines.map((line, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: [0.15, 0.65, 0.15],
            scaleX: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: line.left,
            top: line.top,
            width: line.w,
            height: 2,
            transform: `rotate(${line.rotate}deg)`,
            background:
              "linear-gradient(to right, transparent, #E8A838, transparent)",
            boxShadow: "0 0 12px #E8A838",
          }}
        />
      ))}

      {/* Nodes */}

      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.15,
          }}
          style={{
            position: "absolute",
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#E8C4A0",
            boxShadow: "0 0 12px #E8A838",
          }}
        />
      ))}
    </div>
  );
}