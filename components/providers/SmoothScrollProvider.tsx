"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisProvider } from "@/context/LenisContext";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;

    // Native scrolling is smoother and more battery-friendly on phones/tablets.
    if (reducedMotion || touchDevice || smallScreen) {
      setLenis(null);
      return;
    }

    const instance = new Lenis({
      duration: 0.78,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    setLenis(instance);
    instance.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        instance.scrollTo(el as HTMLElement, { offset: -90, duration: 0.7 });
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <LenisProvider value={lenis}>{children}</LenisProvider>;
}
