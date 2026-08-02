"use client";

import { useGLTF } from "@react-three/drei";

type Props = {
  path: string;
};

export default function ModelLoader({ path }: Props) {
  const { scene } = useGLTF(path);

  return (
    <primitive
      object={scene}
      dispose={null}
    />
  );
}