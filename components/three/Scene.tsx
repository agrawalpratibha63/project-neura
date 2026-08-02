"use client";

import { Canvas } from "@react-three/fiber";

import CameraRig from "./CameraRig";
import Environment from "./Environment";
import AICore from "./AICore";
import AICity from "./AICity";
import HeroHologram from "./HeroHologram";
import EnergyRing from "./EnergyRing";
import EnergyArcs from "./EnergyArcs";
import ReactorAura from "./ReactorAura";
import PlasmaArcs from "./PlasmaArcs";
import NeuralParticles from "./NeuralParticles";
import PostProcessing from "./PostProcessing";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.3], fov: 40 }}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <CameraRig />
      <Environment />
      <AICity />
      <HeroHologram />
      <AICore />
      <EnergyRing />
      <EnergyArcs />
      <ReactorAura />
      <PlasmaArcs />
      <NeuralParticles />
      <PostProcessing />
    </Canvas>
  );
}
