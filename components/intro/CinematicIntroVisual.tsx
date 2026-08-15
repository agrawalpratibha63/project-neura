"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";
import IntroEnergyRings from "./IntroEnergyRings";

export default function CinematicIntroVisual() {
  const stage = useIntro((s) => s.stage);
  const handProgress = useIntro((s) => s.handProgress);
  const blastFlash = useIntro((s) => s.blastFlash);

  const aiHandRef = useRef<HTMLDivElement>(null);
  const humanHandRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const enterTlRef = useRef<gsap.core.Timeline | null>(null);

  const show =
    stage >= INTRO_STAGES.ENERGY_CORE && stage <= INTRO_STAGES.NAME_REVEAL;

  // Cinematic hand entrance
  useEffect(() => {
    if (stage !== INTRO_STAGES.HANDS_ENTER) return;
    if (!aiHandRef.current || !humanHandRef.current) return;
    if (enterTlRef.current) return;

    const tl = gsap.timeline();
    enterTlRef.current = tl;

    tl.fromTo(
      aiHandRef.current,
      { x: "-110vw", opacity: 0, scale: 0.65, rotateY: 25 },
      { x: "-42vw", opacity: 1, scale: 1, rotateY: 8, duration: 1.6, ease: "power3.out" },
      0
    ).fromTo(
      humanHandRef.current,
      { x: "60vw", opacity: 0, scale: 0.65, rotateY: -25 },
      { x: "4vw", opacity: 1, scale: 1, rotateY: -8, duration: 1.6, ease: "power3.out" },
      0
    );

    return () => {
      tl.kill();
      enterTlRef.current = null;
    };
  }, [stage]);

  // Smooth approach — hands converge fingertip to fingertip
  useEffect(() => {
    if (stage !== INTRO_STAGES.HANDS_APPROACH) return;
    if (!aiHandRef.current || !humanHandRef.current) return;

    const aiX = -42 + handProgress * 40;
    const humanX = 4 - handProgress * 40;
    const scale = 1 + handProgress * 0.04;
    const glow = handProgress * 30;

    gsap.set(aiHandRef.current, {
      x: `${aiX}vw`,
      scale,
      filter: `drop-shadow(0 0 ${glow}px rgba(232,168,56,0.8))`,
    });
    gsap.set(humanHandRef.current, {
      x: `${humanX}vw`,
      scale,
      filter: `drop-shadow(0 0 ${glow}px rgba(232,168,56,0.8))`,
    });
  }, [handProgress, stage]);

  // Blast spark
  useEffect(() => {
    if (stage !== INTRO_STAGES.TOUCH_BLAST || !sparkRef.current) return;

    gsap.fromTo(
      sparkRef.current,
      { scale: 0.2, opacity: 0 },
      { scale: 1.2, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
    gsap.to(sparkRef.current, {
      scale: 1.6,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.in",
    });
  }, [stage]);

  if (!show) return null;

  const showHands = stage >= INTRO_STAGES.HANDS_ENTER && stage <= INTRO_STAGES.TOUCH_BLAST;
  const showSpark = stage === INTRO_STAGES.TOUCH_BLAST || (stage === INTRO_STAGES.HANDS_APPROACH && handProgress > 0.95);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: "1400px" }}>
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(2,6,23,0.85) 100%)",
        }}
      />

      {/* Energy rings between hands */}
      <IntroEnergyRings />

      {/* AI Hand — left */}
      {showHands && (
        <div
          ref={aiHandRef}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: "min(680px, 48vw)",
            height: "min(420px, 30vw)",
            marginTop: "-14vh",
            marginLeft: "-50%",
            zIndex: 25,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/images/ai-hand-left.png"
            alt=""
            fill
            priority
            className="object-contain object-right"
          />
        </div>
      )}

      {/* Human Hand — right */}
      {showHands && (
        <div
          ref={humanHandRef}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: "min(680px, 48vw)",
            height: "min(420px, 30vw)",
            marginTop: "-14vh",
            zIndex: 25,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/images/human-hand-right.png"
            alt=""
            fill
            priority
            className="object-contain object-left"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      )}

      {/* Touch spark */}
      {showSpark && (
        <div
          ref={sparkRef}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: "min(600px, 50vw)",
            height: "min(600px, 50vw)",
            marginLeft: "-50%",
            marginTop: "-50%",
            zIndex: 35,
            opacity: stage === INTRO_STAGES.TOUCH_BLAST ? 1 : 0,
          }}
        >
          <Image
            src="/images/spark.png"
            alt=""
            fill
            priority
            className="object-contain"
            style={{
              filter: "drop-shadow(0 0 60px #E8C4A0) drop-shadow(0 0 120px #E8A838) drop-shadow(0 0 200px #C87941)",
            }}
          />
        </div>
      )}

      {/* Blast white flash handled by BlastOverlay */}
      {blastFlash > 0.5 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 38,
            background: `radial-gradient(circle, rgba(255,255,255,${blastFlash * 0.9}) 0%, rgba(232,196,160,${blastFlash * 0.4}) 50%, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
}
