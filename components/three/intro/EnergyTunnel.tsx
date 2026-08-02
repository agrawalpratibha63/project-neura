"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

export default function EnergyTunnel() {
  const groupRef = useRef<THREE.Group>(null!);
  const stage = useIntro((s) => s.stage);

  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: Math.random() * 20 - 10,
        speed: 0.15 + Math.random() * 0.25,
      });
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const show = stage === INTRO_STAGES.TUNNEL || stage === INTRO_STAGES.NAME_REVEAL;
    groupRef.current.visible = show;
    if (!show) return;

    groupRef.current.children.forEach((child, i) => {
      const line = lines[i];
      child.position.z += line.speed * delta * 30;
      if (child.position.z > 5) {
        child.position.z = -15;
        child.position.x = line.x;
        child.position.y = line.y;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, line.y, line.z]}>
          <boxGeometry args={[0.02, 0.02, 1.5]} />
          <meshBasicMaterial color="#E8A838" transparent opacity={0.6} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
