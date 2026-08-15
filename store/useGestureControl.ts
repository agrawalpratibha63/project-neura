"use client";

import { create } from "zustand";
import type { SensitivityLevel } from "@/lib/vision/gestureMath";

export type GestureStatus =
  | "idle"
  | "loading"
  | "active"
  | "no-hand"
  | "error"
  | "permission-denied";

export type GestureMode = "point" | "scroll" | "pinch";

type GestureState = {
  enabled: boolean;
  status: GestureStatus;
  errorMessage: string | null;
  pointer: { x: number; y: number };
  isPinching: boolean;
  handDetected: boolean;
  showPreview: boolean;
  sensitivity: SensitivityLevel;
  gestureMode: GestureMode;
  scrollDirection: "up" | "down" | null;
  videoReady: boolean;
  setEnabled: (enabled: boolean) => void;
  setStatus: (status: GestureStatus) => void;
  setError: (message: string | null) => void;
  setPointer: (x: number, y: number) => void;
  setPinching: (pinching: boolean) => void;
  setHandDetected: (detected: boolean) => void;
  setShowPreview: (show: boolean) => void;
  setSensitivity: (level: SensitivityLevel) => void;
  setGestureMode: (mode: GestureMode) => void;
  setScrollDirection: (dir: "up" | "down" | null) => void;
  setVideoReady: (ready: boolean) => void;
  reset: () => void;
};

export const useGestureControl = create<GestureState>((set) => ({
  enabled: false,
  status: "idle",
  errorMessage: null,
  pointer: { x: 0, y: 0 },
  isPinching: false,
  handDetected: false,
  showPreview: true,
  sensitivity: "medium",
  gestureMode: "point",
  scrollDirection: null,
  videoReady: false,
  setEnabled: (enabled) => set({ enabled }),
  setStatus: (status) => set({ status }),
  setError: (errorMessage) => set({ errorMessage }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
  setPinching: (isPinching) => set({ isPinching }),
  setHandDetected: (handDetected) => set({ handDetected }),
  setShowPreview: (showPreview) => set({ showPreview }),
  setSensitivity: (sensitivity) => set({ sensitivity }),
  setGestureMode: (gestureMode) => set({ gestureMode }),
  setScrollDirection: (scrollDirection) => set({ scrollDirection }),
  setVideoReady: (videoReady) => set({ videoReady }),
  reset: () =>
    set({
      enabled: false,
      status: "idle",
      errorMessage: null,
      isPinching: false,
      handDetected: false,
      gestureMode: "point",
      scrollDirection: null,
      videoReady: false,
    }),
}));
