"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

/** Subtle energy core only — hands rendered via DOM overlay for correct facing */
export default function HandBillboards() {
  const groupRef = useRef<THREE.Group>(null!);
  const stage = useIntro((s) => s.stage);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const show = stage >= INTRO_STAGES.HANDS_ENTER && stage <= INTRO_STAGES.TOUCH_BLAST;
    groupRef.current.visible = show;
    if (show) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#E8A838" toneMapped={false} />
      </mesh>
      <pointLight color="#E8A838" intensity={12} distance={6} />
    </group>
  );
}
