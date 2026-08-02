"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hand, X, Camera, Info, ChevronUp, MousePointerClick, Settings2 } from "lucide-react";
import { useGestureControl } from "@/store/useGestureControl";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";
import type { SensitivityLevel } from "@/lib/vision/gestureMath";

const SENSITIVITY_OPTIONS: { value: SensitivityLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function GestureControlPanel() {
  const stage = useIntro((s) => s.stage);
  const enabled = useGestureControl((s) => s.enabled);
  const status = useGestureControl((s) => s.status);
  const errorMessage = useGestureControl((s) => s.errorMessage);
  const handDetected = useGestureControl((s) => s.handDetected);
  const showPreview = useGestureControl((s) => s.showPreview);
  const sensitivity = useGestureControl((s) => s.sensitivity);
  const gestureMode = useGestureControl((s) => s.gestureMode);
  const setEnabled = useGestureControl((s) => s.setEnabled);
  const setShowPreview = useGestureControl((s) => s.setShowPreview);
  const setSensitivity = useGestureControl((s) => s.setSensitivity);

  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hintSeen, setHintSeen] = useState(true);

  useEffect(() => {
    setHintSeen(localStorage.getItem("gesture-hint-seen") === "1");
  }, []);

  const isPortfolio = stage >= INTRO_STAGES.PORTFOLIO;
  if (!isPortfolio) return null;

  const toggle = () => {
    if (enabled) {
      setEnabled(false);
      setShowHelp(false);
      setShowSettings(false);
    } else {
      setEnabled(true);
    }
  };

  const statusLabel = {
    idle: "Ready",
    loading: "Starting camera…",
    active: handDetected
      ? gestureMode === "scroll"
        ? "Scrolling…"
        : gestureMode === "pinch"
          ? "Clicking…"
          : "Hand detected"
      : "Show your hand",
    "no-hand": "Raise hand to camera",
    error: "Error",
    "permission-denied": "Camera blocked",
  }[status];

  return (
    <>
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className={`fixed bottom-6 left-6 z-[99990] flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-sm font-medium transition-all shadow-lg ${
          enabled
            ? "bg-saffron/20 border-saffron/50 text-saffron"
            : "bg-plum-mid/90 border-copper/30 text-cream hover:border-saffron/40"
        }`}
        style={{ backdropFilter: "blur(12px)" }}
        aria-label={enabled ? "Disable hand control" : "Enable hand control"}
      >
        <Hand size={18} />
        <span className="hidden sm:inline">
          {enabled ? "Hand Control ON" : "Hand Control"}
        </span>
        {enabled && (
          <span
            className={`w-2 h-2 rounded-full ${
              handDetected ? "bg-green-400 animate-pulse" : "bg-zinc-500"
            }`}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-6 z-[99990] w-72 rounded-2xl border border-copper/25 overflow-hidden"
            style={{
              background: "rgba(26,16,37,0.95)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera size={14} className="text-saffron" />
                <span className="text-xs font-mono text-cream uppercase tracking-wider">
                  CV Hand Control
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-zinc-500 hover:text-saffron transition-colors"
                  aria-label="Sensitivity settings"
                >
                  <Settings2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="text-zinc-500 hover:text-saffron transition-colors"
                  aria-label="Gesture help"
                >
                  <Info size={14} />
                </button>
              </div>
            </div>

            <div className="px-4 py-3">
              <p className="text-xs text-zinc-400">{statusLabel}</p>
              {errorMessage && (
                <p className="text-xs text-red-400 mt-1">{errorMessage}</p>
              )}
            </div>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-white/5"
                >
                  <div className="px-4 py-3">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                      Sensitivity
                    </p>
                    <div className="flex gap-2">
                      {SENSITIVITY_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSensitivity(opt.value)}
                          className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                            sensitivity === opt.value
                              ? "bg-saffron/20 text-saffron border border-saffron/40"
                              : "bg-white/5 text-zinc-400 border border-white/10 hover:border-copper/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-white/5"
                >
                  <div className="px-4 py-3 space-y-2.5 text-[11px] text-zinc-400">
                    <div className="flex items-start gap-2">
                      <MousePointerClick size={13} className="text-saffron shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-cream">Point</strong> — Index finger moves cursor
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Hand size={13} className="text-copper shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-cream">Pinch</strong> — Thumb + index touch to click
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronUp size={13} className="text-cream shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-cream">Move hand up</strong> — Page scrolls up
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronUp size={13} className="text-cream shrink-0 mt-0.5 rotate-180" />
                      <span>
                        <strong className="text-cream">Move hand down</strong> — Page scrolls down
                      </span>
                    </div>
                    <p className="text-zinc-600 pt-1">
                      Open palm works best for scrolling. Use High sensitivity if gestures feel slow.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full py-2 text-[10px] text-zinc-600 hover:text-zinc-400 border-t border-white/5 transition-colors"
            >
              {showPreview ? "Hide" : "Show"} camera preview
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!enabled && !hintSeen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 3 }}
            className="fixed bottom-24 left-6 z-[99989] max-w-xs px-4 py-3 rounded-xl border border-saffron/20 text-xs text-zinc-400"
            style={{ background: "rgba(26,16,37,0.9)", backdropFilter: "blur(8px)" }}
          >
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("gesture-hint-seen", "1");
                setHintSeen(true);
              }}
              className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-400"
            >
              <X size={12} />
            </button>
            <p>
              <span className="text-saffron font-medium">Try Hand Control</span> — Navigate with finger gestures. Pinch to click, move hand up/down to scroll.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
