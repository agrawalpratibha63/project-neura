"use client";

import { createContext, useContext, type RefObject } from "react";

type GestureVideoContextValue = {
  videoRef: RefObject<HTMLVideoElement | null>;
};

export const GestureVideoContext = createContext<GestureVideoContextValue | null>(null);

export function useGestureVideo() {
  const ctx = useContext(GestureVideoContext);
  if (!ctx) throw new Error("useGestureVideo must be used within HandGestureSystem");
  return ctx;
}
