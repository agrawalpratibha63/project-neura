"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function PlasmaArcs() {
  const group = useRef<THREE.Group>(null!);

  const points = useMemo(() => {
    const p: THREE.Vector3[] = [];

    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * Math.PI * 2;

      p.push(
        new THREE.Vector3(
          Math.cos(t) * 1.45,
          Math.sin(t * 2) * 0.18,
          Math.sin(t) * 1.45
        )
      );
    }

    return p;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const t = clock.getElapsedTime();

    group.current.rotation.y = t * 0.8;
    group.current.rotation.x = Math.sin(t) * 0.15;
  });

  return (
    <group ref={group}>
      <Line
        points={points}
        color="#4fd9ff"
        lineWidth={2}
        transparent
        opacity={0.9}
      />
    </group>
  );
}