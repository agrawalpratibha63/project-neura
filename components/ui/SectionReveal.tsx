"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSectionReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(".reveal-item");
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 40 });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

export function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useSectionReveal();
  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
