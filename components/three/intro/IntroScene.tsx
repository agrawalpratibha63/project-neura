"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CameraRig from "../CameraRig";
import Environment from "../Environment";
import AICore from "../AICore";
import EnergyRing from "../EnergyRing";
import EnergyArcs from "../EnergyArcs";
import ReactorAura from "../ReactorAura";
import PlasmaArcs from "../PlasmaArcs";
import NeuralParticles from "../NeuralParticles";
import PostProcessing from "../PostProcessing";
import EnergyCore from "./EnergyCore";
import BlastSpark from "./BlastSpark";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

export default function IntroScene() {
  const stage = useIntro((s) => s.stage);
  const visible =
    stage >= INTRO_STAGES.ENERGY_CORE && stage <= INTRO_STAGES.NAME_REVEAL;

  if (!visible) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.3], fov: 40 }}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <CameraRig />
        <Environment />
        <EnergyCore />
        <AICore />
        <EnergyRing />
        <EnergyArcs />
        <ReactorAura />
        <PlasmaArcs />
        <NeuralParticles />
        <BlastSpark />
        <PostProcessing />
      </Suspense>
    </Canvas>
  );
}
