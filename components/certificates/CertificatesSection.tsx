"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, CalendarDays, ExternalLink, ShieldCheck, X } from "lucide-react";
import { certificates } from "@/lib/content/portfolio";

export default function CertificatesSection() {
  const [active, setActive] = useState<(typeof certificates)[0] | null>(null);

  return (
    <section
      id="certificates"
      className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-24 lg:px-[8%]"
      style={{ background: "linear-gradient(180deg, #1A1025 0%, #241530 100%)" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-saffron/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <span className="text-xs uppercase tracking-[0.26em] text-saffron sm:text-sm">Certifications</span>
          <h2 className="mt-3 font-orbitron text-3xl font-bold text-white md:text-4xl">Verified Credentials</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
            A clean credential index — certificates stay hidden until you choose to view them.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/10">
          <div className="hidden grid-cols-[58px_1.8fr_1fr_150px_138px] gap-4 border-b border-white/10 bg-black/15 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 md:grid">
            <span>#</span>
            <span>Credential</span>
            <span>Issuer</span>
            <span>Date</span>
            <span className="text-right">Certificate</span>
          </div>

          {certificates.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
              className="group border-b border-white/[0.07] p-5 last:border-b-0 md:grid md:grid-cols-[58px_1.8fr_1fr_150px_138px] md:items-center md:gap-4 md:px-6 md:py-5"
            >
              <div className="mb-4 flex items-center justify-between md:mb-0 md:block">
                <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
                {cert.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300 md:hidden">
                    <ShieldCheck size={12} /> Verified
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-saffron/20 bg-saffron/10 text-saffron">
                    <Award size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-5 text-white sm:text-base">{cert.title}</h3>
                    <div className="mt-2 hidden items-center gap-1.5 md:flex">
                      {cert.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                          <ShieldCheck size={11} /> Verified credential
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-l border-white/10 pl-4 md:mt-0 md:border-l-0 md:pl-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 md:hidden">Issuer</p>
                <p className="mt-1 text-sm text-zinc-300 md:mt-0">{cert.issuer}</p>
              </div>

              <div className="mt-3 flex items-center gap-2 border-l border-white/10 pl-4 text-sm text-zinc-400 md:mt-0 md:border-l-0 md:pl-0">
                <CalendarDays size={14} className="text-copper" />
                <span>{cert.date}</span>
              </div>

              <div className="mt-5 md:mt-0 md:text-right">
                <button
                  type="button"
                  onClick={() => setActive(cert)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-copper/30 bg-copper/10 px-4 py-2.5 text-xs font-semibold text-cream transition hover:border-saffron/50 hover:bg-saffron/10 hover:text-saffron md:w-auto"
                >
                  View <ExternalLink size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#09050f]/95 p-3 backdrop-blur-md sm:p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative my-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-[#1F1528] p-3 shadow-2xl sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-3 px-1 sm:mb-4">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-saffron">Certificate Preview</p>
                  <h3 className="mt-1 truncate text-sm font-semibold text-white sm:text-base">{active.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-copper/50 hover:text-saffron"
                  aria-label="Close certificate preview"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
                <Image src={active.image} alt={active.title} fill className="object-contain" quality={100} sizes="(max-width: 768px) 96vw, 850px" />
              </div>

              <div className="flex flex-col gap-1 px-1 pb-1 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-zinc-300">{active.issuer}</p>
                <p className="text-zinc-500">{active.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
