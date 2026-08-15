"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function ReactorAura() {
  const aura = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!aura.current) return;

    const t = clock.getElapsedTime();
const pulse = 1.32 + Math.sin(t * 2.2) * 0.015;

    aura.current.scale.setScalar(pulse);

    aura.current.rotation.y += 0.0005;
  });

  return (
    <mesh ref={aura}>
      <sphereGeometry args={[0.72,64,64]} />

   <meshBasicMaterial
  color="#58dfff"
  transparent
  opacity={0.028}
  side={THREE.BackSide}
  depthWrite={false}
/>
    </mesh>
  );
}