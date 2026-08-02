"use client";

import Background from "./Background";
import Navbar from "./Navbar";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";
import NeuralBackground from "./NeuralBackground";

export default function PortfolioHero() {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      <Background />
      <NeuralBackground />
      <Navbar />
      <HeroContent />
      <ScrollIndicator />
    </section>
  );
}
