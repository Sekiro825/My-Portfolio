"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Shape({ kind, color }: { kind: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  let geometry;
  switch (kind) {
    case "🤖":
      geometry = <torusKnotGeometry args={[1, 0.3, 128, 16]} />;
      break;
    case "🩺":
      geometry = <icosahedronGeometry args={[1.5, 0]} />;
      break;
    case "✨":
      geometry = <octahedronGeometry args={[1.5, 0]} />;
      break;
    case "🐾":
      geometry = <coneGeometry args={[1, 2, 16]} />;
      break;
    case "🔒":
      geometry = <boxGeometry args={[1.5, 1.5, 1.5]} />;
      break;
    default:
      geometry = <sphereGeometry args={[1.2, 32, 32]} />;
      break;
  }

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
}

export default function Hero3DVisual({ emoji, accent }: { emoji: string; accent: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color={accent} />
        <Environment preset="city" />
        <Shape kind={emoji} color={accent || "#e50914"} />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color={accent} />
      </Canvas>
    </div>
  );
}
