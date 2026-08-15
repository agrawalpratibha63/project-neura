"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

export default function BlastSpark() {
  const ref = useRef<THREE.Mesh>(null!);
  const tex = useTexture("/images/spark.png");
  const stage = useIntro((s) => s.stage);
  const blastFlash = useIntro((s) => s.blastFlash);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const show = stage === INTRO_STAGES.TOUCH_BLAST || blastFlash > 0;
    ref.current.visible = show;
    if (!show) return;

    const scale = 2 + blastFlash * 3 + Math.sin(clock.getElapsedTime() * 20) * 0.1;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[4, 4]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} opacity={0.9} />
    </mesh>
  );
}
