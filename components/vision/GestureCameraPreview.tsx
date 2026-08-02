"use client";

import { useGestureControl } from "@/store/useGestureControl";
import { useGestureVideo } from "@/context/GestureVideoContext";

export default function GestureCameraPreview() {
  const enabled = useGestureControl((s) => s.enabled);
  const showPreview = useGestureControl((s) => s.showPreview);
  const handDetected = useGestureControl((s) => s.handDetected);
  const gestureMode = useGestureControl((s) => s.gestureMode);
  const scrollDirection = useGestureControl((s) => s.scrollDirection);
  const isPinching = useGestureControl((s) => s.isPinching);
  const videoReady = useGestureControl((s) => s.videoReady);
  const { videoRef } = useGestureVideo();

  if (!enabled || !showPreview) return null;

  const modeLabel = {
    point: "Pointing",
    scroll: scrollDirection === "up" ? "Scrolling ↑" : scrollDirection === "down" ? "Scrolling ↓" : "Scroll ready",
    pinch: "Click!",
  }[gestureMode];

  return (
    <div
      className="fixed bottom-[22rem] left-6 z-[99991] w-40 sm:w-44 rounded-xl overflow-hidden border border-copper/30 shadow-xl"
      style={{ background: "rgba(26,16,37,0.95)", backdropFilter: "blur(12px)" }}
    >
      <div className="relative aspect-[4/3] bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-x-[-1]"
          playsInline
          muted
          autoPlay
        />
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="w-5 h-5 border-2 border-saffron/30 border-t-saffron rounded-full animate-spin" />
          </div>
        )}

        {/* Mode indicator overlay */}
        {handDetected && (
          <div
            className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider"
            style={{
              background:
                gestureMode === "pinch"
                  ? "rgba(232,168,56,0.85)"
                  : gestureMode === "scroll"
                    ? "rgba(200,121,65,0.85)"
                    : "rgba(255,255,255,0.15)",
              color: gestureMode === "pinch" ? "#1A1025" : "#FAF7F2",
            }}
          >
            {isPinching ? "Click" : modeLabel}
          </div>
        )}

        {/* Corner guides */}
        <div className="absolute inset-2 border border-saffron/20 rounded-lg pointer-events-none" />
      </div>

      <div className="px-2.5 py-2 flex items-center justify-between">
        <span className="text-[9px] text-zinc-500 font-mono uppercase">Live Camera</span>
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            handDetected ? "bg-green-400 animate-pulse" : "bg-zinc-600"
          }`}
        />
      </div>
    </div>
  );
}
