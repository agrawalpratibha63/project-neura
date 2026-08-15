"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

const TIMELINE = {
  hud: 2.6,
  nameReveal: 3.0,
};

export default function IntroSequence() {
  const stage = useIntro((s) => s.stage);
  const skipped = useIntro((s) => s.skipped);
  const setStage = useIntro((s) => s.setStage);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (skipped) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seenIntro = sessionStorage.getItem("neura-intro-seen") === "true";
    if (reducedMotion || seenIntro) {
      setStage(INTRO_STAGES.PORTFOLIO);
    }
  }, [skipped, setStage]);

  useEffect(() => {
    if (stage !== INTRO_STAGES.HUD) return;
    if (startedRef.current || timelineRef.current) return;
    startedRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("neura-intro-seen", "true");
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      },
    });
    timelineRef.current = tl;

    tl.to({}, { duration: TIMELINE.hud })
      .call(() => setStage(INTRO_STAGES.NAME_REVEAL))
      .to({}, { duration: TIMELINE.nameReveal })
      .call(() => setStage(INTRO_STAGES.PORTFOLIO));
  }, [stage, setStage]);

  useEffect(() => {
    if (!skipped) return;
    timelineRef.current?.kill();
    timelineRef.current = null;
    startedRef.current = false;
  }, [skipped]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      startedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (stage !== INTRO_STAGES.HUD) return;
    const timeout = setTimeout(() => {
      if (useIntro.getState().stage === INTRO_STAGES.HUD) {
        setStage(INTRO_STAGES.PORTFOLIO);
        sessionStorage.setItem("neura-intro-seen", "true");
      }
    }, 10000);
    return () => clearTimeout(timeout);
  }, [stage, setStage]);

  return null;
}

export function MobileIntroEnter() {
  const stage = useIntro((s) => s.stage);
  const setStage = useIntro((s) => s.setStage);

  if (stage >= INTRO_STAGES.PORTFOLIO) return null;
  if (typeof window !== "undefined" && window.innerWidth >= 768) return null;
  if (stage > INTRO_STAGES.HUD) return null;

  const handleEnter = () => {
    sessionStorage.setItem("neura-intro-seen", "true");
    setStage(INTRO_STAGES.PORTFOLIO);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <div className="absolute inset-0 z-[200] flex flex-col items-center justify-center bg-[#1A1025] md:hidden">
      <div className="text-center space-y-6 p-8">
        <h1 className="font-orbitron text-3xl text-white tracking-wide">Pratibha Agrawal</h1>
        <p className="text-saffron font-mono text-sm tracking-wider">AI / ML STUDENT</p>
        <button
          type="button"
          onClick={handleEnter}
          className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-saffron to-copper text-white font-semibold"
        >
          View Portfolio
        </button>
      </div>
    </div>
  );
}
