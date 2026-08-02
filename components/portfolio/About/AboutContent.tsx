"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/content/portfolio";

export default function AboutContent() {
  return (
    <div className="flex flex-col justify-center relative z-10">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-saffron text-sm tracking-widest uppercase mb-6"
      >
        {about.badge}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-orbitron text-4xl lg:text-5xl font-bold leading-tight m-0 text-white"
      >
        {about.heading}{" "}
        <span className="text-saffron">{about.headingAccent}</span>
      </motion.h2>

      {about.paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="text-zinc-300 text-lg leading-relaxed max-w-lg mt-6"
        >
          {p}
        </motion.p>
      ))}

      <motion.a
        href={about.cta.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-block mt-10 w-fit px-7 py-3.5 rounded-xl border border-copper/40 text-saffron font-medium no-underline hover:bg-saffron/10 transition-colors"
      >
        {about.cta.label}
      </motion.a>
    </div>
  );
}
