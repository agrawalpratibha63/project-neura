"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { hackathons } from "@/lib/content/portfolio";

export default function HackathonsSection() {
  const [active, setActive] = useState<(typeof hackathons)[0] | null>(null);

  return (
    <section id="hackathons" className="relative py-20 px-[8%]" style={{ background: "linear-gradient(180deg, #241530 0%, #1A1025 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-saffron text-sm tracking-widest uppercase">Hackathons</span>
          <h2 className="font-orbitron text-3xl font-bold text-white mt-3">Competitive Events</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hackathons.map((h, i) => (
            <motion.button
              key={h.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              onClick={() => setActive(h)}
              className="group text-left rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:border-copper/35 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-black/40">
                <Image
                  src={h.image}
                  alt={h.title}
                  fill
                  className="object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={95}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-saffron mb-2">
                  <Zap size={16} />
                  <span className="text-xs font-mono uppercase">{h.year}</span>
                  {h.verified && (
                    <span className="ml-auto text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">VERIFIED</span>
                  )}
                </div>
                <h3 className="text-white font-semibold">{h.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">{h.event}</p>
                <p className="text-zinc-500 text-xs mt-1">{h.date}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: "rgba(2,6,23,0.96)" }}
            onClick={() => setActive(null)}
          >
            <button type="button" onClick={() => setActive(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white z-10">
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              className="max-w-3xl w-full rounded-2xl border border-white/10 bg-[#1F1528] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] bg-black rounded-xl overflow-hidden">
                <Image src={active.image} alt={active.title} fill className="object-contain" quality={100} />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-white font-bold">{active.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
