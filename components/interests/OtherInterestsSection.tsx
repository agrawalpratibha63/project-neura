"use client";

import { otherInterests } from "@/lib/content/portfolio";

export default function OtherInterestsSection() {
  const items = [...otherInterests.gallery, ...otherInterests.gallery];

  return (
    <section id="interests" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #1F1528 0%, #1A1025 100%)" }}>
      <div className="px-[8%] mb-12 max-w-3xl">
        <span className="text-saffron text-sm tracking-widest uppercase">Other Interests</span>
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3">
          {otherInterests.title}
        </h2>
        <p className="text-zinc-400 mt-4 leading-relaxed">{otherInterests.description}</p>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-5 animate-marquee w-max">
          {items.map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-72 h-48 rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-saffron/10 to-copper/10 flex items-center justify-center"
            >
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🎨</div>
                <p className="text-zinc-400 text-sm">Work #{(i % otherInterests.gallery.length) + 1}</p>
                <p className="text-zinc-600 text-xs mt-1">Coming soon</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
