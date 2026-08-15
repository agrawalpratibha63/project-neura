"use client";

import { Environment as DreiEnvironment } from "@react-three/drei";

export default function Environment() {
  return (
    <>
      {/* Global ambient light */}
      <ambientLight intensity={0.35} />

      {/* Main key light */}
      <directionalLight
        position={[8, 10, 6]}
        intensity={2}
        color="#ffffff"
      />

      {/* Blue accent light */}
      <pointLight
        position={[2, 2, 3]}
        intensity={8}
        color="#C87941"
      />

      {/* Cyan rim light */}
      <pointLight
        position={[-3, 1, 2]}
        intensity={5}
        color="#E8A838"
      />

      {/* Studio reflections */}
      <DreiEnvironment preset="studio" />
    </>
  );
}