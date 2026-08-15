"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ARC_COUNT = 18;

export default function EnergyArcs() {
  const group = useRef<THREE.Group>(null!);

  const arcs = useMemo(() => {
    return Array.from({ length: ARC_COUNT }, (_, i) => {
      const angle = (i / ARC_COUNT) * Math.PI * 2;

      return {
        angle,
        radius: 1.05 + Math.random() * 0.45,
        speed: 0.3 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const t = clock.getElapsedTime();

    group.current.children.forEach((child, index) => {
      const arc = arcs[index];

      const theta = t * arc.speed + arc.offset;

      child.position.set(
        Math.cos(theta) * arc.radius,
        Math.sin(theta * 2.0) * 0.25,
        Math.sin(theta) * arc.radius
      );

      child.rotation.x += 0.03;
      child.rotation.y += 0.02;

      const material =
        (child as THREE.Mesh).material as THREE.MeshBasicMaterial;

      material.opacity =
        0.25 +
        Math.abs(Math.sin(t * 6 + index)) * 0.75;
    });
  });

  return (
    <group ref={group}>
      {arcs.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.03, 12, 12]} />

          <meshBasicMaterial
            color="#E8C4A0"
            transparent
            opacity={1}
          />
        </mesh>
      ))}
    </group>
  );
}