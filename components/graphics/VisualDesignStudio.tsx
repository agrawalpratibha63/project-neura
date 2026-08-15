"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  graphicsPortfolio,
  graphicsSkills,
  designWorkflow,
  showcaseWorks,
} from "@/lib/content/graphics";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function FloatingPreview({
  src,
  className,
  delay = 0,
  pushed = false,
  pushX = 0,
  pushY = 0,
}: {
  src: string;
  className?: string;
  delay?: number;
  pushed?: boolean;
  pushX?: number;
  pushY?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-lg overflow-hidden border border-white/5 opacity-[0.12] pointer-events-none ${className}`}
      animate={{
        y: pushed ? pushY : [0, -14, 0],
        x: pushed ? pushX : 0,
        rotate: [-2, 2, -2],
        scale: pushed ? 0.92 : 1,
      }}
      transition={{ duration: pushed ? 0.5 : 8 + delay, repeat: pushed ? 0 : Infinity, ease: "easeInOut", delay: pushed ? 0 : delay }}
    >
      <Image src={src} alt="" width={120} height={80} className="object-cover w-full h-full" />
    </motion.div>
  );
}

function MarqueeRibbon() {
  const [paused, setPaused] = useState(false);

  const ribbon = (copy: number) => (
    <div className="graphics-trail-group" aria-hidden={copy === 1}>
      {showcaseWorks.map((work) => (
        <motion.article
          key={`${copy}-${work.id}`}
          whileHover={{ y: -8, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="group relative shrink-0"
        >
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_10px_35px_rgba(0,0,0,0.22)] transition-colors duration-300 group-hover:border-saffron/45 ${
              work.aspect === "portrait"
                ? "h-40 w-28 sm:h-44 sm:w-32 md:h-48 md:w-36"
                : work.aspect === "square"
                  ? "h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40"
                  : work.aspect === "wide"
                    ? "h-24 w-44 sm:h-28 sm:w-52 md:h-32 md:w-60"
                    : "h-24 w-40 sm:h-28 sm:w-48 md:h-32 md:w-52"
            }`}
          >
            <Image
              src={work.image}
              alt={copy === 0 ? work.ribbonLabel : ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
              sizes="(max-width: 640px) 208px, 240px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <span className="absolute bottom-2.5 left-3 text-[9px] font-mono uppercase tracking-[0.16em] text-cream/90 sm:text-[10px]">
              {work.ribbonLabel}
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );

  return (
    <motion.div variants={fadeUp} className="relative -mx-[6%] overflow-hidden py-4 sm:py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#141018] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#141018] to-transparent sm:w-24" />

      <div
        className={`graphics-trail-track ${paused ? "is-paused" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {ribbon(0)}
        {ribbon(1)}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[10px]">
        <span className="h-px w-8 bg-white/10" />
        Moving design trail · hover to pause
        <span className="h-px w-8 bg-white/10" />
      </div>
    </motion.div>
  );
}

function HeroShowcase({
  scanning,
  scanDone,
  heroHovered,
}: {
  scanning: boolean;
  scanDone: boolean;
  heroHovered: boolean;
}) {
  const [index, setIndex] = useState(0);
  const current = showcaseWorks[index];

  useEffect(() => {
    if (!scanDone) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % showcaseWorks.length);
    }, 4200);
    return () => clearInterval(t);
  }, [scanDone]);

  useEffect(() => {
    if (scanDone && scanning) {
      setIndex(0);
    }
  }, [scanDone, scanning]);

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[220px] sm:max-h-[260px] md:max-h-[280px] lg:max-h-[300px] rounded-xl overflow-hidden bg-black/30">
      {scanning && (
        <motion.div
          className="absolute left-0 right-0 h-px z-30 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, #E8A838, #F0C060, #E8A838, transparent)",
            boxShadow: "0 0 20px rgba(232,168,56,0.8), 0 0 40px rgba(232,168,56,0.4)",
          }}
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + (scanDone ? index : 0)}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={current.image}
            alt={current.label}
            fill
            className={`object-contain transition-transform duration-700 ${heroHovered ? "scale-[1.03]" : "scale-100"}`}
            sizes="(max-width: 768px) 90vw, 420px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612]/80 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <a
        href={graphicsPortfolio.studioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 z-40 inline-flex items-center gap-2 rounded-lg border border-saffron/30 bg-[#17101f]/90 px-3 py-2 text-[11px] font-semibold text-saffron shadow-lg backdrop-blur-sm transition hover:border-saffron/60 hover:bg-[#21152b] sm:right-4 sm:top-4 sm:px-4 sm:py-2.5 sm:text-sm"
      >
        View live studio
        <ArrowUpRight size={15} />
      </a>

      <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between z-20">
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-saffron mb-0.5">Now Showing</p>
          <p className="text-white font-semibold text-sm md:text-base">{current.label}</p>
        </div>
        <div className="flex gap-1">
          {showcaseWorks.map((w, i) => (
            <div
              key={w.id}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-saffron" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowStrip({ active }: { active: boolean }) {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!active) {
      setStep(-1);
      return;
    }
    let i = 0;
    const run = () => {
      setStep(i);
      i++;
      if (i < designWorkflow.length) {
        setTimeout(run, 700);
      }
    };
    const start = setTimeout(run, 400);
    return () => clearTimeout(start);
  }, [active]);

  return (
    <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mt-8 md:mt-10">
      {designWorkflow.map((item, i) => (
        <div key={item.id} className="flex items-center">
          <motion.div
            className="px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg border text-[10px] md:text-xs font-medium transition-all duration-500"
            animate={{
              borderColor: i <= step ? "rgba(232,168,56,0.5)" : "rgba(255,255,255,0.08)",
              backgroundColor: i <= step ? "rgba(232,168,56,0.12)" : "rgba(255,255,255,0.03)",
              color: i <= step ? "#E8A838" : "#6B5F75",
              boxShadow: i === step ? "0 0 24px rgba(232,168,56,0.2)" : "none",
            }}
          >
            {item.label}
          </motion.div>
          {i < designWorkflow.length - 1 && (
            <span className="hidden md:inline text-zinc-600 mx-2 text-lg">↓</span>
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default function VisualDesignStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [heroHovered, setHeroHovered] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setScanning(true);
    const t1 = setTimeout(() => setScanDone(true), 2200);
    return () => {
      clearTimeout(t1);
    };
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="graphics"
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0814 0%, #141018 40%, #1A1025 100%)" }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="graphics-ambient absolute h-[360px] w-[360px] rounded-full pointer-events-none opacity-20 md:h-[500px] md:w-[500px] md:opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(232,168,56,0.15) 0%, transparent 70%)",
          top: "10%",
          left: "-10%",
        }}
      />
      <motion.div
        className="graphics-ambient absolute h-[300px] w-[300px] rounded-full pointer-events-none opacity-15 md:h-[400px] md:w-[400px] md:opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(200,121,65,0.2) 0%, transparent 70%)",
          bottom: "5%",
          right: "-5%",
        }}
      />

      {/* Scan particles */}
      {scanning && !scanDone && (
        <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-saffron/60"
              style={{ left: `${8 + i * 7}%`, top: `${20 + (i % 4) * 15}%` }}
              animate={{ opacity: [0, 1, 0], y: [0, -30] }}
              transition={{ duration: 1.2, delay: i * 0.08 }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={stagger}
      >
        {/* Header — compact on mobile */}
        <motion.div variants={fadeUp} className="max-w-2xl mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-saffron" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-saffron/80">
              Creative × Engineering
            </span>
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white leading-tight">
            {graphicsPortfolio.title}
          </h2>
          <p className="text-lg md:text-xl text-cream/90 mt-3 font-light leading-snug">
            {graphicsPortfolio.subtitle}
          </p>
          <p className="text-zinc-400 mt-3 leading-relaxed text-sm max-w-xl">
            {graphicsPortfolio.description}
          </p>
        </motion.div>

        {/* Skill pills */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {graphicsSkills.map((skill) => (
            <motion.span
              key={skill}
              whileHover={{ y: -3, scale: 1.02 }}
              className="group rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-zinc-300 transition-colors duration-300 md:text-xs"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,168,56,0.45)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(232,168,56,0.15)";
                e.currentTarget.style.color = "#E8C4A0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.color = "";
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Marquee ribbon */}
        <MarqueeRibbon />

        {/* Hero + CTA — side by side on desktop */}
        <div className="mt-6 md:mt-8 lg:grid lg:grid-cols-[1fr_380px] lg:gap-8 lg:items-start">
          <motion.div
            variants={fadeUp}
            className="relative order-1 lg:order-1"
            onMouseEnter={() => setHeroHovered(true)}
            onMouseLeave={() => setHeroHovered(false)}
          >
            <FloatingPreview
              src={showcaseWorks[0].image}
              className="w-14 h-10 -top-4 -left-2 hidden lg:block"
              delay={0}
              pushed={heroHovered}
              pushX={-12}
              pushY={-10}
            />
            <FloatingPreview
              src={showcaseWorks[2].image}
              className="w-12 h-9 top-1/4 -right-4 hidden lg:block"
              delay={1.2}
              pushed={heroHovered}
              pushX={14}
              pushY={-8}
            />

            <motion.div
              animate={{
                y: heroHovered ? -4 : [0, -4, 0],
                rotateX: heroHovered ? 1.5 : 0,
                rotateY: heroHovered ? -2 : 0,
              }}
              transition={{
                y: heroHovered ? { duration: 0.4 } : { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 0.4 },
                rotateY: { duration: 0.4 },
              }}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
                background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(26,16,37,0.8) 100%)",
              }}
              className={`relative mx-auto max-w-md rounded-2xl border p-2 transition-all duration-500 sm:p-3 lg:mx-0 lg:max-w-none ${
                heroHovered
                  ? "border-saffron/50 shadow-[0_16px_48px_rgba(232,168,56,0.2)]"
                  : "border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
              }`}
            >
              <HeroShowcase scanning={scanning} scanDone={scanDone} heroHovered={heroHovered} />
            </motion.div>
          </motion.div>

          <div className="order-2 lg:order-2 flex flex-col justify-center mt-5 lg:mt-0">
            <motion.div variants={fadeUp} className="hidden lg:block mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-saffron/70 mb-2">Featured Preview</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A rotating showcase of branding, social creatives, and print design — hover to explore each piece in detail.
              </p>
            </motion.div>

          </div>
        </div>

        {/* AI + Design workflow */}
        <WorkflowStrip active={scanDone} />

      </motion.div>
    </section>
  );
}
