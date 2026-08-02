"use client";

import { useRef } from "react";
import { GestureVideoContext } from "@/context/GestureVideoContext";
import HandGestureTracker from "./HandGestureTracker";
import GestureCursor from "./GestureCursor";
import GestureControlPanel from "./GestureControlPanel";
import GestureCameraPreview from "./GestureCameraPreview";

export default function HandGestureSystem() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <GestureVideoContext.Provider value={{ videoRef }}>
      <HandGestureTracker />
      <GestureCameraPreview />
      <GestureCursor />
      <GestureControlPanel />
    </GestureVideoContext.Provider>
  );
}
