"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2500;

export default function NeuralParticles() {
  const points = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const array = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const radius = 2 + Math.random() * 4;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      array[i * 3] =
        radius * Math.sin(phi) * Math.cos(theta);

      array[i * 3 + 1] =
        radius * Math.cos(phi);

      array[i * 3 + 2] =
        radius * Math.sin(phi) * Math.sin(theta);
    }

    return array;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;

    points.current.rotation.y =
      clock.getElapsedTime() * 0.06;

    points.current.rotation.x =
      Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
  <bufferAttribute
    attach="attributes-position"
    args={[positions, 3]}
  />
</bufferGeometry>

      <pointsMaterial
        size={0.03}
        color="#4f9dff"
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}