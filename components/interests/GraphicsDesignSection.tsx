"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Palette } from "lucide-react";
import { graphicsPortfolio } from "@/lib/content/graphics";

export default function GraphicsDesignSection() {
  return (
    <section
      id="graphics"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1F1528 0%, #1A1025 100%)" }}
    >
      <div className="px-[8%] max-w-3xl mx-auto text-center">
        <span className="text-saffron text-sm tracking-widest uppercase">
          {graphicsPortfolio.subtitle}
        </span>
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3">
          {graphicsPortfolio.title}
        </h2>
        <p className="text-zinc-400 mt-4 leading-relaxed">{graphicsPortfolio.intro}</p>
        <p className="text-zinc-500 mt-3 text-sm italic">{graphicsPortfolio.bio}</p>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {graphicsPortfolio.designTypes.map((type) => (
            <span
              key={type}
              className="px-3 py-1.5 text-xs rounded-full border border-white/10 bg-white/5 text-zinc-300"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Studio logo + link only */}
        <motion.a
          href={graphicsPortfolio.studioUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 block rounded-3xl border border-copper/30 overflow-hidden no-underline group mx-auto max-w-md"
          style={{
            background:
              "linear-gradient(145deg, rgba(232,168,56,0.1) 0%, rgba(26,16,37,0.95) 60%)",
            boxShadow: "0 0 60px rgba(232,168,56,0.08)",
          }}
        >
          <div className="p-8 md:p-10 flex flex-col items-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 group-hover:scale-[1.03] transition-transform duration-300">
              <Image
                src={graphicsPortfolio.studioLogo}
                alt={graphicsPortfolio.studioTitle}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Globe size={14} className="text-saffron" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-saffron">
                Live Website
              </span>
            </div>

            <h3 className="font-orbitron text-xl font-bold text-white group-hover:text-cream transition-colors">
              {graphicsPortfolio.studioTitle}
            </h3>

            <p className="text-zinc-500 text-xs mt-2 font-mono">
              {graphicsPortfolio.studioUrl.replace("https://", "")}
            </p>

            <span className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-saffron to-copper text-plum text-sm font-bold group-hover:scale-[1.02] transition-transform">
              Open Graphics Studio <ExternalLink size={16} />
            </span>
          </div>
        </motion.a>

        <div
          className="mt-14 p-8 rounded-2xl border border-white/10 bg-white/5 text-left"
          style={{ backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Palette size={18} className="text-saffron" />
            <h3 className="font-orbitron text-lg text-white">Design Toolkit</h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-5">
            {graphicsPortfolio.toolkit.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-lg border border-copper/20 bg-saffron/5 text-cream text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mb-5">{graphicsPortfolio.commissionNote}</p>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <a
              href={graphicsPortfolio.studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-saffron to-copper text-plum text-sm font-semibold no-underline hover:opacity-90 transition-opacity"
            >
              View Graphics Website <ExternalLink size={14} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-copper/30 text-saffron text-sm font-semibold no-underline hover:bg-saffron/10 transition-colors"
            >
              Commission a Design
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
