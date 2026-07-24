"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Points, PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";

// Warm Floating Gold / Coffee Dust Particles
function CoffeeParticles({ count = 280, color = "#d98a5b" }) {
  const pointsRef = useRef<any>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

// 3D Aesthetic Core Mesh
function CoffeeShape({ kind, color }: { kind: string; color: string }) {
  const meshRef = useRef<any>(null!);
  const outerRef = useRef<any>(null!);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.45;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x -= delta * 0.15;
      outerRef.current.rotation.z += delta * 0.25;
    }
  });

  let geometry;
  switch (kind) {
    case "🤖":
      geometry = <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />;
      break;
    case "🩺":
      geometry = <icosahedronGeometry args={[1.6, 1]} />;
      break;
    case "✨":
      geometry = <octahedronGeometry args={[1.7, 0]} />;
      break;
    case "🐾":
      geometry = <coneGeometry args={[1.2, 2.4, 32]} />;
      break;
    case "🔒":
      geometry = <dodecahedronGeometry args={[1.5, 0]} />;
      break;
    default:
      geometry = <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />;
      break;
  }

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2}>
      <group>
        {/* Inner Core Mesh */}
        <mesh ref={meshRef}>
          {geometry}
          <meshStandardMaterial
            color={color}
            roughness={0.25}
            metalness={0.7}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Outer Wireframe Aura */}
        <mesh ref={outerRef} scale={1.22}>
          {geometry}
          <meshBasicMaterial
            color="#a66e4e"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero3DVisual({ emoji, accent }: { emoji: string; accent: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeColor = accent || "#d98a5b";

  return (
    <div className="w-full h-full min-h-[380px] cursor-grab active:cursor-grabbing pointer-events-auto relative z-20">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={1} color="#fdfbf7" />
        <directionalLight position={[10, 10, 8]} intensity={1.8} color="#fff8f0" />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} color={activeColor} />
        <pointLight position={[0, 0, 3]} intensity={1} color="#e6a756" />
        
        <Environment preset="apartment" />
        <CoffeeParticles count={280} color={activeColor} />
        <CoffeeShape kind={emoji} color={activeColor} />
        
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.35}
          scale={12}
          blur={2.5}
          far={4.5}
          color="#3d261d"
        />
      </Canvas>
    </div>
  );
}
