"use client";

import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

export default function BrandReveal() {
  const stage = useIntro((s) => s.stage);

  if (stage !== INTRO_STAGES.BRAND_REVEAL) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-40 pointer-events-none">
      <div className="space-y-3 animate-zoom-out select-none">
        <h1 className="font-orbitron text-4xl md:text-6xl font-extrabold tracking-[12px] md:tracking-[18px] text-white uppercase brand-glow leading-none">
          PROJECT NEURA
        </h1>
        <p className="font-orbitron text-sm tracking-[10px] text-saffron brand-glow uppercase">
          AI • ML • AUTOMATION
        </p>
      </div>
      <div className="absolute bottom-12 font-mono text-[10px] tracking-[6px] text-zinc-500 uppercase animate-pulse">
        Entering Portfolio System
      </div>
    </div>
  );
}
