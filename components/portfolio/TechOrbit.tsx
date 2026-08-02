"use client";

import { motion } from "framer-motion";

const tech = [
  { name: "AI", x: 0, y: -250, color: "#E8A838" },
  { name: "ML", x: 175, y: -175, color: "#8b5cf6" },
  { name: "DL", x: 250, y: 0, color: "#22c55e" },
  { name: "Python", x: 175, y: 175, color: "#facc15" },
  { name: "React", x: 0, y: 250, color: "#06b6d4" },
  { name: "Next", x: -175, y: 175, color: "#ffffff" },
  { name: "Node", x: -250, y: 0, color: "#22c55e" },
  { name: "SQL", x: -175, y: -175, color: "#fb7185" },
];

export default function TechOrbit() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 45,
        pointerEvents: "none",
      }}
    >
      {tech.map((item, index) => (
        <motion.div
          key={index}
          animate={{
            rotate: -360,
            scale: [1, 1.08, 1],
          }}
          transition={{
            rotate: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
            },
          }}
          style={{
            position: "absolute",

            left: "50%",
            top: "50%",

            marginLeft: item.x - 34,
            marginTop: item.y - 34,

            width: 68,
            height: 68,

            borderRadius: "50%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(232,196,160,.25)",
            backdropFilter: "blur(18px)",

            color: item.color,
            fontSize: 14,
            fontWeight: 700,

            boxShadow: `0 0 25px ${item.color}55`,
          }}
        >
          {item.name}
        </motion.div>
      ))}
    </motion.div>
  );
}