"use client";

import { motion } from "framer-motion";
import { navLinks, siteMeta } from "@/lib/content/portfolio";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 h-[90px] flex items-center justify-between px-6 lg:px-[70px] z-[9999] border-b border-white/8"
      style={{
        background: "rgba(26,16,37,.45)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "0 5px 30px rgba(0,0,0,.25)",
      }}
    >
      <motion.a
        href="#home"
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-4 cursor-pointer no-underline"
      >
        <div
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-white font-black text-xl lg:text-2xl"
          style={{
            background: "linear-gradient(135deg,#E8A838,#C87941)",
            boxShadow: "0 0 25px rgba(232,168,56,.45)",
          }}
        >
          P
        </div>
        <div>
          <div className="text-white text-lg lg:text-xl font-bold">{siteMeta.name.split(" ")[0]}</div>
          <div className="text-[#E8C4A0] text-[10px] lg:text-xs tracking-[3px]">{siteMeta.role.toUpperCase()}</div>
        </div>
      </motion.a>

      <nav className="hidden lg:flex items-center gap-12">
        {navLinks.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            whileHover={{ color: "#E8A838", y: -2 }}
            transition={{ duration: 0.25 }}
            className="text-white no-underline text-base font-medium"
          >
            {item.name}
          </motion.a>
        ))}
      </nav>

      <motion.a
        href={siteMeta.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="px-5 lg:px-8 py-3 rounded-xl text-white text-sm lg:text-base font-semibold no-underline"
        style={{
          background: "linear-gradient(135deg,#C87941,#E8A838)",
          boxShadow: "0 0 25px rgba(232,168,56,.35)",
        }}
      >
        Resume
      </motion.a>
    </motion.header>
  );
}
