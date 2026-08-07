"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const items = [...showcaseWorks, ...showcaseWorks];

  return (
    <motion.div variants={fadeUp} className="relative py-3 -mx-[4%] overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #141018 0%, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #141018 0%, transparent)" }}
      />

      <div
        className={`flex gap-5 w-max px-4 ${paused ? "" : "animate-marquee-slow"}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredId(null);
        }}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => {
          setPaused(false);
          setHoveredId(null);
        }}
      >
        {items.map((work, i) => {
          const isHovered = hoveredId === `${work.id}-${i}`;
          const anyHovered = hoveredId !== null;
          return (
            <motion.div
              key={`${work.id}-${i}`}
              className="relative shrink-0 cursor-pointer"
              onMouseEnter={() => setHoveredId(`${work.id}-${i}`)}
              animate={{
                scale: isHovered ? 1.08 : 1,
                filter: anyHovered && !isHovered ? "blur(3px)" : "blur(0px)",
                opacity: anyHovered && !isHovered ? 0.55 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div
                className={`relative overflow-hidden rounded-lg border transition-shadow duration-500 ${
                  work.aspect === "portrait"
                    ? "w-24 h-32 sm:w-28 sm:h-36"
                    : work.aspect === "square"
                      ? "w-28 h-28 sm:w-32 sm:h-32"
                      : work.aspect === "wide"
                        ? "w-36 h-20 sm:w-44 sm:h-24"
                        : "w-32 h-20 sm:w-36 sm:h-24"
                } ${isHovered ? "border-saffron/50 shadow-[0_0_40px_rgba(232,168,56,0.25)]" : "border-white/10"}`}
              >
                <Image src={work.image} alt={work.ribbonLabel} fill className="object-cover" sizes="224px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono uppercase tracking-wider text-cream/90">
                  {work.ribbonLabel}
                </span>
              </div>
            </motion.div>
          );
        })}
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
          initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
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
  const [btnGlow, setBtnGlow] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (!inView) return;
    setScanning(true);
    const t1 = setTimeout(() => setScanDone(true), 2200);
    const t2 = setTimeout(() => setBtnGlow(true), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="graphics"
      onMouseMove={onMouseMove}
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0814 0%, #141018 40%, #1A1025 100%)" }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(232,168,56,0.15) 0%, transparent 70%)",
          top: "10%",
          left: "-10%",
        }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(200,121,65,0.2) 0%, transparent 70%)",
          bottom: "5%",
          right: "-5%",
        }}
        animate={{ x: [0, -35, 0], y: [0, 25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mouse spotlight */}
      <motion.div
        className="absolute pointer-events-none z-[1] w-[420px] h-[420px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          left: spotX,
          top: spotY,
          background: "radial-gradient(circle, rgba(232,168,56,0.08) 0%, transparent 65%)",
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
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 px-[6%] max-w-6xl mx-auto"
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
              className="group px-3 py-1.5 rounded-full text-[11px] md:text-xs font-medium border border-white/10 text-zinc-300 cursor-default transition-all duration-400"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
              }}
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
                backdropFilter: "blur(20px)",
              }}
              className={`relative rounded-2xl border p-2 md:p-3 transition-all duration-500 max-w-md mx-auto lg:max-w-none lg:mx-0 ${
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

            <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
              <motion.a
                href={graphicsPortfolio.studioUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: btnGlow
                    ? [
                        "0 0 24px rgba(232,168,56,0.3)",
                        "0 0 40px rgba(232,168,56,0.4)",
                        "0 0 24px rgba(232,168,56,0.3)",
                      ]
                    : "0 0 0px transparent",
                }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-plum font-bold text-sm overflow-hidden no-underline"
                style={{
                  background: "linear-gradient(135deg, #E8A838 0%, #E8C4A0 45%, #C87941 100%)",
                }}
              >
                <span className="relative z-10">{graphicsPortfolio.ctaLabel}</span>
                <motion.span className="relative z-10" whileHover={{ x: 4 }}>
                  <ArrowUpRight size={18} />
                </motion.span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, #F0C060 0%, #E8A838 50%, #D4622A 100%)",
                  }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* AI + Design workflow */}
        <WorkflowStrip active={scanDone} />

        {/* Live Pratibha Graphics Studio embed */}
        <motion.div variants={fadeUp} className="mt-14 md:mt-16">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-saffron/70 mb-1">
                Live vault
              </p>
              <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                {graphicsPortfolio.studioTitle}
              </h3>
            </div>
            <a
              href={graphicsPortfolio.studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-saffron hover:text-saffron/80 no-underline font-medium"
            >
              Open full studio
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0809] shadow-[0_20px_60px_rgba(0,0,0,0.45)] aspect-[16/11] min-h-[320px]">
            <iframe
              src={graphicsPortfolio.studioUrl}
              title={graphicsPortfolio.studioTitle}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allow="fullscreen"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-zinc-500 text-xs md:text-sm">
            Embedded live from {graphicsPortfolio.studioUrl.replace("https://", "")} — sign in inside
            the frame or open full studio above.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
