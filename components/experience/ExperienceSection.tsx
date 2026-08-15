"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/content/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".exp-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-[8%]"
      style={{ background: "linear-gradient(180deg, #241530 0%, #1A1025 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="reveal-item text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full text-saffron text-sm tracking-widest border border-copper/25 bg-saffron/5 mb-6">
            EXPERIENCE
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">
            My <span className="text-saffron">Journey</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-saffron/50 via-copper/20 to-transparent md:-translate-x-1/2" />

          {experience.map((item, i) => (
            <div
              key={item.id}
              className={`exp-card relative flex mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="hidden md:block md:w-1/2" />
              <div
                className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-saffron -translate-x-1/2 mt-8 z-10"
                style={{ boxShadow: "0 0 15px #E8A838" }}
              />
              <div className="ml-14 md:ml-0 md:w-1/2 md:px-10">
                <div
                  className="glass-card p-6 rounded-2xl border border-white/10 hover:border-copper/30 transition-all duration-300"
                  style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-xs font-mono text-saffron tracking-wider uppercase">{item.type}</span>
                  <h3 className="text-xl font-bold text-white mt-2">{item.role}</h3>
                  <p className="text-cream/80 text-sm mt-1">{item.company}</p>
                  <p className="text-zinc-500 text-xs mt-1 font-mono">{item.period}</p>
                  <p className="text-zinc-300 mt-4 leading-relaxed text-sm">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
