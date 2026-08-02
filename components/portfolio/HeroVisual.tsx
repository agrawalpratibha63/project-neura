"use client";

import { motion } from "framer-motion";

import OrbitRings from "./OrbitRings";
import ReactorCore from "./ReactorCore";
import EnergyParticles from "./EnergyParticles";
import EnergyArcs from "./EnergyArcs";
import MouseParallax from "./MouseParallax";
import TechOrbit from "./TechOrbit";

export default function HeroVisual() {
  return (
  <MouseParallax>
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1.2,
      }}
      style={{
        position: "relative",
        width: 420,
        height: 420,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OrbitRings />

      <EnergyParticles />

      <EnergyArcs />
      

      <ReactorCore />
      <TechOrbit />

      
    </motion.div>
  </MouseParallax>
);}