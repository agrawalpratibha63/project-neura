"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ExternalLink, MapPin, ShieldCheck, Sparkles, Trophy, X } from "lucide-react";
import { hackathons } from "@/lib/content/portfolio";

export default function HackathonsSection() {
  const [active, setActive] = useState<(typeof hackathons)[0] | null>(null);

  return (
    <section
      id="hackathons"
      className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-24 lg:px-[8%]"
      style={{ background: "linear-gradient(180deg, #241530 0%, #1A1025 100%)" }}
    >
      <div className="pointer-events-none absolute right-[8%] top-12 h-72 w-72 rounded-full bg-copper/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 md:mb-14 md:flex md:items-end md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.26em] text-saffron sm:text-sm">Hackathons & Challenges</span>
            <h2 className="mt-3 font-orbitron text-3xl font-bold text-white md:text-4xl">Competitive Events</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
              A timeline of build sprints, problem-solving events, and hands-on competition experience.
            </p>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 md:mt-0">
            <Trophy size={15} className="text-saffron" /> {hackathons.length} events documented
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-saffron/50 via-copper/20 to-transparent sm:left-[27px]" />

          <div className="space-y-5 sm:space-y-6">
            {hackathons.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
                className="relative pl-12 sm:pl-16"
              >
                <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-saffron/30 bg-[#241530] text-saffron shadow-[0_0_24px_rgba(232,168,56,0.12)] sm:h-14 sm:w-14">
                  <span className="font-orbitron text-[10px] font-bold sm:text-xs">0{index + 1}</span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-copper/30 hover:bg-white/[0.05] sm:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron/20 bg-saffron/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-saffron">
                          <Sparkles size={11} /> {event.year}
                        </span>
                        {event.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                            <ShieldCheck size={12} /> Verified
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">{event.title}</h3>
                      <p className="mt-1 text-sm text-cream/80">{event.event}</p>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">{event.description}</p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} className="text-copper" /> {event.date}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-copper" /> Competitive participation</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActive(event)}
                      className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-copper/30 bg-copper/10 px-4 py-3 text-xs font-semibold text-cream transition hover:border-saffron/50 hover:bg-saffron/10 hover:text-saffron lg:w-auto"
                    >
                      View Certificate <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
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
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative my-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-[#1F1528] p-3 shadow-2xl sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-start justify-between gap-3 px-1 sm:mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-saffron">Event Credential</p>
                  <h3 className="mt-1 text-sm font-semibold text-white sm:text-base">{active.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-copper/50 hover:text-saffron"
                  aria-label="Close event certificate preview"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/40">
                <Image src={active.image} alt={active.title} fill className="object-contain" quality={100} sizes="(max-width: 768px) 96vw, 850px" />
              </div>
              <p className="px-1 pb-1 pt-4 text-sm leading-6 text-zinc-400">{active.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
