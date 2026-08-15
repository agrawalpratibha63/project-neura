"use client";

import { achievements } from "@/lib/content/portfolio";
import { Trophy } from "lucide-react";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-32 px-[8%]" style={{ background: "#1A1025" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal-item">
          <span className="inline-block px-5 py-2 rounded-full text-saffron text-sm tracking-widest border border-copper/25 bg-saffron/5 mb-6">ACHIEVEMENTS</span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">Highlights & <span className="text-saffron">Awards</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-copper/30 hover:-translate-y-1 transition-all duration-300"
              style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-3">
                <Trophy className="text-saffron" size={24} />
                <span className="text-xs font-mono text-saffron/80 uppercase">{item.category}</span>
              </div>
              <h3 className="text-white font-bold text-lg mt-3">{item.title}</h3>
              <p className="text-zinc-400 text-sm mt-2">{item.description}</p>
              <p className="text-zinc-500 text-xs font-mono mt-3">{item.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
