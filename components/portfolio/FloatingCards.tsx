"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content/portfolio";

const positions = [
  { top: "12%", left: "5%", delay: 0 },
  { top: "72%", left: "8%", delay: 0.4 },
  { top: "18%", right: "6%", delay: 0.8 },
  { top: "74%", right: "8%", delay: 1.2 },
];

export default function FloatingCards() {
  return (
    <>
      {hero.floatingCards.map((card, index) => (
        <motion.div
          key={card.title}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: positions[index].delay,
          }}
          className="absolute hidden lg:flex flex-col justify-center items-center w-[180px] h-[90px] rounded-[22px] z-20"
          style={{
            top: positions[index].top,
            left: positions[index].left,
            right: positions[index].right,
            background: "rgba(15,23,42,.42)",
            border: "1px solid rgba(232,196,160,.18)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            boxShadow: "0 0 30px rgba(232,168,56,.12), inset 0 0 20px rgba(255,255,255,.04)",
          }}
        >
          <div className="text-[#E8C4A0] text-sm tracking-wider uppercase mb-2">{card.title}</div>
          <div className="text-white text-2xl font-bold">{card.value}</div>
        </motion.div>
      ))}
    </>
  );
}
