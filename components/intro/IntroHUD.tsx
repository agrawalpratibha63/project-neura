"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

const STATUS_MESSAGES = [
  "Connecting to server",
  "Loading assets",
  "Initializing portfolio",
  "Almost ready",
];

export default function IntroHUD() {
  const stage = useIntro((s) => s.stage);
  const loadPercent = useIntro((s) => s.loadPercent);
  const setLoadPercent = useIntro((s) => s.setLoadPercent);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (stage !== INTRO_STAGES.HUD) return;
    setLoadPercent(0);
    setMsgIndex(0);

    let percent = 0;
    const interval = setInterval(() => {
      percent = Math.min(100, percent + 1.5);
      setLoadPercent(Math.round(percent));
      if (percent >= 25) setMsgIndex(1);
      if (percent >= 50) setMsgIndex(2);
      if (percent >= 80) setMsgIndex(3);
      if (percent >= 100) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [stage, setLoadPercent]);

  if (stage !== INTRO_STAGES.HUD) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-30"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-7"
      >
        {/* Dual ring spinner */}
        <div className="relative w-14 h-14 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-copper/20 border-t-saffron"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-copper/20 border-b-copper"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-saffron"
            style={{ boxShadow: "0 0 12px #E8A838" }}
          />
        </div>

        {/* Status text with crossfade */}
        <div className="h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-zinc-400 text-sm tracking-wide"
            >
              {STATUS_MESSAGES[msgIndex]}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ...
              </motion.span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar with shimmer */}
        <div className="w-56 h-1.5 bg-zinc-800/60 rounded-full overflow-hidden mx-auto relative">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              width: `${loadPercent}%`,
              background: "linear-gradient(90deg, #C87941, #E8A838, #E8C4A0)",
            }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
            />
          </motion.div>
        </div>

        {/* Percentage counter */}
        <motion.p
          key={loadPercent}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="text-saffron/70 text-xs font-mono tracking-widest"
        >
          {loadPercent}%
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
