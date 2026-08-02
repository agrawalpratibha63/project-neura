"use client";

import { services } from "@/lib/content/portfolio";
import { Code, Palette, Brush } from "lucide-react";

const icons = { code: Code, palette: Palette, brush: Brush };

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 px-[8%]" style={{ background: "linear-gradient(180deg, #1F1528 0%, #1A1025 100%)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-saffron text-sm tracking-widest uppercase">What I Do</span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3">Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = icons[svc.icon as keyof typeof icons] || Code;
            return (
              <div
                key={svc.id}
                className="service-card p-8 rounded-2xl border border-white/10 text-center bg-white/5"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-saffron/10 border border-copper/20 flex items-center justify-center">
                  <Icon className="text-saffron" size={28} />
                </div>
                <h3 className="text-white font-bold mt-5">{svc.title}</h3>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{svc.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
