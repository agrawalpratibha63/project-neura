"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { INTRO_STAGES, useIntro } from "./useIntro";

type RingRef = THREE.Mesh | null;

export default function EnergyRing() {
  const inner = useRef<RingRef>(null);
  const middle = useRef<RingRef>(null);
  const outer = useRef<RingRef>(null);
  const stage = useIntro((s) => s.stage);
  const handProgress = useIntro((s) => s.handProgress);

  const visible =
    stage >= INTRO_STAGES.ENERGY_CORE && stage <= INTRO_STAGES.NAME_REVEAL;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = 1 + (stage >= INTRO_STAGES.HANDS_APPROACH ? handProgress * 2.5 : 0);

    [inner, middle, outer].forEach((ref) => {
      if (ref.current) ref.current.visible = visible;
    });

    if (!visible) return;

    if (inner.current) {
      inner.current.rotation.z = t * 1.8 * speed;
      inner.current.rotation.y = t * 0.6 * speed;
    }

    if (middle.current) {
      middle.current.rotation.x = t * 1.1 * speed;
      middle.current.rotation.z = -t * 0.8 * speed;
    }

    if (outer.current) {
      outer.current.rotation.y = -t * 0.5 * speed;
      outer.current.rotation.x = t * 0.4 * speed;
    }
  });

  return (
    <>
      {/* INNER */}
      <mesh ref={inner}>
        <torusGeometry args={[1.45, 0.018, 32, 256]} />
        <meshBasicMaterial
          color="#E8C4A0"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* MIDDLE */}
      <mesh ref={middle}>
        <torusGeometry args={[1.75, 0.022, 32, 256]} />
        <meshBasicMaterial
          color="#C87941"
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* OUTER */}
      <mesh ref={outer}>
        <torusGeometry args={[2.05, 0.015, 32, 256]} />
        <meshBasicMaterial
          color="#E8C4A0"
          transparent
          opacity={0.65}
        />
      </mesh>
    </>
  );
}