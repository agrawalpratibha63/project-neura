"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award } from "lucide-react";
import { certificates } from "@/lib/content/portfolio";

export default function CertificatesSection() {
  const [active, setActive] = useState<(typeof certificates)[0] | null>(null);

  return (
    <section id="certificates" className="relative py-24 px-[8%]" style={{ background: "linear-gradient(180deg, #1A1025 0%, #241530 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-saffron text-sm tracking-widest uppercase">Certifications</span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3">
            Verified Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.id}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(cert)}
              className="group text-left rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:border-copper/40 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-white/95 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1025]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <Award className="text-saffron shrink-0" size={18} />
                  {cert.verified && (
                    <span className="text-[10px] font-mono text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">VERIFIED</span>
                  )}
                </div>
                <h3 className="text-white font-semibold mt-3 text-sm leading-snug">{cert.title}</h3>
                <p className="text-zinc-400 text-xs mt-1">{cert.issuer}</p>
                <p className="text-zinc-500 text-xs mt-1">{cert.date}</p>
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
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(2,6,23,0.96)" }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1F1528] p-4 md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3] bg-white rounded-xl overflow-hidden">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-contain"
                  quality={100}
                  sizes="90vw"
                />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-white font-bold text-lg">{active.title}</h3>
                <p className="text-saffron text-sm mt-1">{active.issuer} · {active.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
