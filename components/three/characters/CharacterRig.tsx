"use client";

import { create } from "zustand";
import * as THREE from "three";

type IntroState = {
  aiHandRef: React.MutableRefObject<THREE.Group | null>;
  humanHandRef: React.MutableRefObject<THREE.Group | null>;

  stage: number;
  setStage: (stage: number) => void;
};

export const useCharacterRig = create<IntroState>((set) => ({
  aiHandRef: {
    current: null,
  },

  humanHandRef: {
    current: null,
  },

  stage: 0,

  setStage: (stage) =>
    set({
      stage,
    }),
}));

export const CHARACTER = {
  AI_START: [-6, -0.7, 0] as [number, number, number],

  AI_END: [-1.15, -0.25, 0] as [number, number, number],

  HUMAN_START: [6, -0.7, 0] as [number, number, number],

  HUMAN_END: [1.15, -0.25, 0] as [number, number, number],
};