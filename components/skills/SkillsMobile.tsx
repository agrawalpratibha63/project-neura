"use client";

import { skills } from "@/lib/content/portfolio";

type Props = {
  activeSkill: (typeof skills)[0];
  onSelect: (skill: (typeof skills)[0]) => void;
};

export default function SkillsMobile({ activeSkill, onSelect }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {skills.map((skill) => (
          <button
            key={skill.name}
            type="button"
            onClick={() => onSelect(skill)}
            className={`snap-center shrink-0 px-5 py-3 rounded-xl border transition-all ${
              activeSkill.name === skill.name
                ? "border-copper bg-saffron/10 text-saffron"
                : "border-white/10 bg-white/5 text-zinc-300"
            }`}
          >
            {skill.name}
          </button>
        ))}
      </div>
      <div className="glass-card p-6 rounded-2xl border border-white/10" style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.05)" }}>
        <h3 className="font-orbitron text-xl text-saffron mb-2">{activeSkill.name}</h3>
        <p className="text-zinc-400 text-sm">{activeSkill.category}</p>
      </div>
    </div>
  );
}
