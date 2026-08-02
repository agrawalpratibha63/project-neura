"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/content/portfolio";

const categoryMeta: Record<string, { color: string; glow: string; icon: string }> = {
  Programming: { color: "#E8A838", glow: "rgba(232,168,56,0.35)", icon: "{ }" },
  Web: { color: "#C87941", glow: "rgba(200,121,65,0.35)", icon: "◈" },
  Database: { color: "#E8C4A0", glow: "rgba(232,196,160,0.35)", icon: "▦" },
  Design: { color: "#D4622A", glow: "rgba(212,98,42,0.35)", icon: "✦" },
};

const levelColors: Record<string, string> = {
  Advanced: "#E8A838",
  Intermediate: "#C87941",
  Beginner: "#A89BB0",
};

export default function SkillsSection() {
  const [active, setActive] = useState(skills[0].name);
  const categories = [...new Set(skills.map((s) => s.category))];
  const activeSkill = skills.find((s) => s.name === active) ?? skills[0];
  const meta = categoryMeta[activeSkill.category] ?? categoryMeta.Programming;

  return (
    <section
      id="skills"
      className="relative py-28 px-[8%] overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A1025 0%, #1F1528 50%, #1A1025 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-25"
          style={{ background: `radial-gradient(circle, ${meta.glow}, transparent 70%)` }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-saffron text-sm tracking-widest uppercase">Skills</span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3">
            Tech Stack & Tools
          </h2>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto text-sm">
            Tap any skill to explore experience, proficiency, and real project usage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Orbital picker — 3 rings, wider spread + rotation */}
          <div className="relative h-[480px] md:h-[540px] flex items-center justify-center overflow-visible">
            <motion.div
              className="absolute w-20 h-20 rounded-full border border-saffron/30 flex items-center justify-center z-20"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(232,168,56,0.2)",
                  "0 0 60px rgba(232,168,56,0.45)",
                  "0 0 30px rgba(232,168,56,0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-copper" />
            </motion.div>

            {[
              { size: 220, radius: 110, speed: 55, direction: 1 },
              { size: 320, radius: 160, speed: 70, direction: -1 },
              { size: 420, radius: 210, speed: 85, direction: 1 },
            ].map((ring, ringIdx) => {
              const ringSkills = skills.filter((_, i) => i % 3 === ringIdx);

              return (
                <motion.div
                  key={ring.size}
                  className="absolute rounded-full border border-white/[0.07]"
                  style={{ width: ring.size, height: ring.size }}
                  animate={{ rotate: 360 * ring.direction }}
                  transition={{
                    duration: ring.speed,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {ringSkills.map((skill, i) => {
                    const angle = (i / ringSkills.length) * Math.PI * 2 - Math.PI / 2;
                    const x = Math.cos(angle) * ring.radius;
                    const y = Math.sin(angle) * ring.radius;
                    const isActive = active === skill.name;
                    const cat = categoryMeta[skill.category] ?? categoryMeta.Programming;

                    return (
                      <motion.button
                        key={skill.name}
                        type="button"
                        onClick={() => setActive(skill.name)}
                        className="absolute z-10"
                        style={{
                          left: "50%",
                          top: "50%",
                          marginLeft: x - 44,
                          marginTop: y - 22,
                        }}
                        animate={{ rotate: -360 * ring.direction }}
                        transition={{
                          duration: ring.speed,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        whileHover={{ scale: 1.14 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className={`px-3.5 py-2 rounded-xl border text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                            isActive ? "text-white" : "text-zinc-300"
                          }`}
                          style={{
                            background: isActive ? `${cat.color}25` : "rgba(255,255,255,0.04)",
                            borderColor: isActive ? cat.color : "rgba(255,255,255,0.08)",
                            boxShadow: isActive ? `0 0 24px ${cat.glow}` : "none",
                          }}
                        >
                          {skill.name}
                          {skill.experience && (
                            <span className="block text-[9px] opacity-70 mt-0.5 font-mono">
                              {skill.experience}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="p-7 md:p-8 rounded-2xl border border-copper/20 bg-white/[0.04]"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                    style={{
                      background: `${meta.color}20`,
                      color: meta.color,
                      border: `1px solid ${meta.color}40`,
                    }}
                  >
                    {meta.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      {activeSkill.category}
                    </p>
                    <h3 className="text-xl font-bold text-white">{activeSkill.name}</h3>
                  </div>
                </div>
                <span
                  className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border"
                  style={{
                    color: levelColors[activeSkill.level] ?? "#A89BB0",
                    borderColor: `${levelColors[activeSkill.level] ?? "#A89BB0"}40`,
                    background: `${levelColors[activeSkill.level] ?? "#A89BB0"}15`,
                  }}
                >
                  {activeSkill.level}
                </span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-5">{activeSkill.summary}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-lg bg-saffron/10 border border-saffron/25 text-saffron text-xs font-mono">
                  {activeSkill.experience} experience
                </span>
                <span className="px-3 py-1 rounded-lg bg-copper/10 border border-copper/25 text-cream text-xs">
                  {activeSkill.proficiency}% proficiency
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Proficiency</span>
                  <span style={{ color: meta.color }}>{activeSkill.proficiency}%</span>
                </div>
                <div className="h-2.5 bg-zinc-800/80 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${meta.color}, ${meta.color}66)`,
                      boxShadow: `0 0 12px ${meta.glow}`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${activeSkill.proficiency}%` }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="mb-5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
                  Used in
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.usedIn.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-[11px] rounded-md bg-black/30 border border-white/5 text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">
                  Tools & frameworks
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-[11px] rounded-md border border-copper/20 text-cream"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5 grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="p-3 rounded-xl bg-black/25 border border-white/5 text-center"
                  >
                    <div className="text-lg font-bold text-white">
                      {skills.filter((s) => s.category === cat).length}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                      {cat}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile chips */}
        <div className="lg:hidden mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {skills.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setActive(s.name)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm border ${
                active === s.name
                  ? "border-copper text-saffron bg-saffron/10"
                  : "border-white/10 text-zinc-400"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
