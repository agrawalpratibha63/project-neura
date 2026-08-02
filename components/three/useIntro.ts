"use client";

import { create } from "zustand";

export const INTRO_STAGES = {
  SEARCH: 0,
  ENERGY_CORE: 1,
  RINGS_PARTICLES: 2,
  CAMERA_ZOOM: 3,
  HUD: 4,
  HANDS_ENTER: 5,
  HANDS_APPROACH: 6,
  TOUCH_BLAST: 7,
  BRAND_REVEAL: 8,
  TUNNEL: 9,
  NAME_REVEAL: 10,
  PORTFOLIO: 11,
} as const;

export type IntroStage = (typeof INTRO_STAGES)[keyof typeof INTRO_STAGES];

type IntroState = {
  stage: IntroStage;
  audioEnabled: boolean;
  skipped: boolean;
  handProgress: number;
  loadPercent: number;
  blastFlash: number;
  ringIntensity: number;
  setStage: (stage: IntroStage) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setSkipped: (skipped: boolean) => void;
  setHandProgress: (progress: number) => void;
  setLoadPercent: (percent: number) => void;
  setBlastFlash: (flash: number) => void;
  setRingIntensity: (intensity: number) => void;
  skipToPortfolio: () => void;
};

export const useIntro = create<IntroState>((set) => ({
  stage: INTRO_STAGES.SEARCH,
  audioEnabled: false,
  skipped: false,
  handProgress: 0,
  loadPercent: 0,
  blastFlash: 0,
  ringIntensity: 0,

  setStage: (stage) => set({ stage }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setSkipped: (skipped) => set({ skipped }),
  setHandProgress: (handProgress) => set({ handProgress }),
  setLoadPercent: (loadPercent) => set({ loadPercent }),
  setBlastFlash: (blastFlash) => set({ blastFlash }),
  setRingIntensity: (ringIntensity) => set({ ringIntensity }),

  skipToPortfolio: () =>
    set({
      stage: INTRO_STAGES.PORTFOLIO,
      skipped: true,
      blastFlash: 0,
    }),
}));
