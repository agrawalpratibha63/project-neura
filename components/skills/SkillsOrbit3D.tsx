"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/content/portfolio";

type Props = {
  onSelect: (skill: (typeof skills)[0]) => void;
};

export default function SkillsOrbit3D({ onSelect }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const radius = 3.5;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#E8A838" />
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#C87941" emissive="#E8A838" emissiveIntensity={2} wireframe />
      </mesh>
      <group ref={groupRef}>
        {skills.map((skill, i) => {
          const angle = (i / skills.length) * Math.PI * 2;
          const speed = 0.3 + (i % 5) * 0.1;
          return (
            <SkillNode key={skill.name} skill={skill} angle={angle} radius={radius} speed={speed} onSelect={onSelect} />
          );
        })}
      </group>
    </>
  );
}

function SkillNode({
  skill,
  angle,
  radius,
  speed,
  onSelect,
}: {
  skill: (typeof skills)[0];
  angle: number;
  radius: number;
  speed: number;
  onSelect: (s: (typeof skills)[0]) => void;
}) {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.3;
  });

  return (
    <group ref={ref}>
      <mesh
        onClick={() => onSelect(skill)}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#E8A838" emissive="#C87941" emissiveIntensity={1.5} />
      </mesh>
      <Text position={[0, 0.5, 0]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
        {skill.name}
      </Text>
    </group>
  );
}
