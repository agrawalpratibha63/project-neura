"use client";

import { motion } from "framer-motion";

const icons = ["⚡", "🧠", "🔬", "💻", "🎯", "🚀", "📊", "🔮"];

export default function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {icons.map((icon, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${10 + (i * 12) % 80}%`,
            top: `${15 + (i * 17) % 70}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {icon}
        </motion.span>
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1={`${10 + i * 15}%`}
            y1="20%"
            x2={`${30 + i * 12}%`}
            y2="80%"
            stroke="#E8A838"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>
    </div>
  );
}
