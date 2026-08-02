"use client";

import { education } from "@/lib/content/portfolio";

export default function EducationSection() {
  return (
    <section id="education" className="relative py-32 px-[8%]" style={{ background: "linear-gradient(180deg, #1A1025 0%, #1F1528 100%)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal-item">
          <span className="inline-block px-5 py-2 rounded-full text-saffron text-sm tracking-widest border border-copper/25 bg-saffron/5 mb-6">EDUCATION</span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">Academic <span className="text-saffron">Path</span></h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-saffron/30" />
          {education.map((edu) => (
            <div key={edu.id} className="relative pl-12 pb-12 last:pb-0">
              <div className="absolute left-2.5 w-3 h-3 rounded-full bg-saffron -translate-x-1/2" style={{ boxShadow: "0 0 12px #E8A838" }} />
              <div className="glass-card p-6 rounded-2xl border border-white/10" style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.05)" }}>
                <p className="text-saffron text-xs font-mono tracking-wider">{edu.period}</p>
                <h3 className="text-white text-xl font-bold mt-2">{edu.degree}</h3>
                <p className="text-zinc-400 mt-1">{edu.institution}</p>
                <p className="text-cream text-sm mt-2 font-mono">CGPA: {edu.cgpa}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {edu.achievements.map((a) => (
                    <span key={a} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
