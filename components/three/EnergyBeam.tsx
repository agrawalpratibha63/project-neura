"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function EnergyBeam() {
  const beam = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!beam.current) return;

    (beam.current.material as THREE.MeshBasicMaterial).opacity =
     0.45 + Math.sin(clock.elapsedTime * 4) * 0.15;
  });

  return (
    <mesh
      ref={beam}
      position={[0, 0, 0]}
      rotation={[0, 0, Math.PI / 2]}
    >
      <cylinderGeometry args={[0.03, 0.08, 4.2, 32]} />

      <meshBasicMaterial
        color="#4fd9ff"
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}