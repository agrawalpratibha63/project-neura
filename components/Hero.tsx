"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INTRO_STAGES, useIntro } from "./three/useIntro";
import IntroSequence, { MobileIntroEnter } from "./three/IntroSequence";
import SearchBrowser from "./intro/SearchBrowser";
import IntroHUD from "./intro/IntroHUD";
import NameReveal, { IntroControls } from "./intro/IntroControls";
import Background from "./portfolio/Background";
import NeuralBackground from "./portfolio/NeuralBackground";
import Portfolio from "./Portfolio";

export default function Hero() {
  const stage = useIntro((s) => s.stage);
  const isPortfolio = stage >= INTRO_STAGES.PORTFOLIO;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seenIntro = sessionStorage.getItem("neura-intro-seen") === "true";
    if (reducedMotion || seenIntro) {
      useIntro.getState().setStage(INTRO_STAGES.PORTFOLIO);
    }
  }, []);

  const showStarBg =
    stage >= INTRO_STAGES.HUD && stage < INTRO_STAGES.PORTFOLIO;

  return (
    <div className="relative w-full" style={{ background: "#1A1025" }}>
      <AnimatePresence mode="wait">
        {!isPortfolio && (
          <motion.section
            key="intro"
            className="relative w-full h-screen overflow-hidden"
            style={{ background: "#1A1025" }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <IntroSequence />
            <IntroControls />
            <MobileIntroEnter />

            {stage === INTRO_STAGES.SEARCH && <SearchBrowser />}

            <AnimatePresence>
              {showStarBg && (
                <motion.div
                  key="star-bg"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Background />
                  <NeuralBackground />

                  <AnimatePresence mode="wait">
                    {stage === INTRO_STAGES.HUD && (
                      <IntroHUD key="hud" />
                    )}
                    {stage === INTRO_STAGES.NAME_REVEAL && (
                      <NameReveal key="name" />
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>

      {isPortfolio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Portfolio />
        </motion.div>
      )}
    </div>
  );
}
