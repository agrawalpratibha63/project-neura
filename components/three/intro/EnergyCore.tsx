"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

export default function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const stage = useIntro((s) => s.stage);

  useFrame(({ clock }) => {
    if (!coreRef.current || !glowRef.current) return;
    const t = clock.getElapsedTime();
    const visible = stage >= INTRO_STAGES.ENERGY_CORE && stage < INTRO_STAGES.PORTFOLIO;
    coreRef.current.visible = visible;
    glowRef.current.visible = visible;

    if (!visible) return;

    const scale = stage === INTRO_STAGES.ENERGY_CORE
      ? Math.min(1, t * 0.5)
      : 1 + Math.sin(t * 4) * 0.05;

    coreRef.current.scale.setScalar(scale);
    glowRef.current.scale.setScalar(scale * 2.5);

    const mat = coreRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 3 + Math.sin(t * 5) * 1.5;
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#C87941" transparent opacity={0.15} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#C87941"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#C87941" intensity={stage >= INTRO_STAGES.ENERGY_CORE ? 15 : 0} distance={8} />
    </group>
  );
}
