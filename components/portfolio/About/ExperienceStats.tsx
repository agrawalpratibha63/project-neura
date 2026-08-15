"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/lib/content/portfolio";

export default function ExperienceStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(about.stats.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(about.stats.map((s) => Math.round(s.value * eased)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible]);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 mt-10">
      {about.stats.map((stat, i) => (
        <div
          key={stat.label}
          className="p-5 rounded-2xl border border-white/10 text-center"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
        >
          <div className="font-orbitron text-3xl font-black text-saffron">
            {counts[i]}{stat.suffix}
          </div>
          <div className="text-zinc-400 text-xs mt-2 tracking-wide">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
