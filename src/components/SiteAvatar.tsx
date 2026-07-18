"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import * as THREE from "three";
import { ErrorBoundary } from "react-error-boundary";

// Avatar Component
function Avatar({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Mesh>(null!);
  const leftLegRef = useRef<THREE.Mesh>(null!);
  const rightLegRef = useRef<THREE.Mesh>(null!);
  const leftArmRef = useRef<THREE.Mesh>(null!);
  const rightArmRef = useRef<THREE.Mesh>(null!);

  // Load user photo for face texture
  // Handle Next.js dynamic path resolution in dev vs prod
  const isProd = process.env.NODE_ENV === "production";
  const texturePath = isProd ? "/My-Portfolio/Saket_Pokale.png" : "/Saket_Pokale.png";

  const faceTexture = useLoader(THREE.TextureLoader, texturePath);

  // State for walking logic
  const targetPos = useRef(new THREE.Vector3(0, -0.5, 0));
  const isWalking = useRef(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. Mouse Tracking for the Head
    // Map mouse coordinates (-1 to +1) to rotation angles
    const headTargetX = (state.pointer.x * Math.PI) / 4; // Look left/right
    const headTargetY = (state.pointer.y * Math.PI) / 4; // Look up/down

    // Smoothly interpolate current head rotation to target
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headTargetX, 0.1);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -headTargetY, 0.1);

    // 2. Random Movement logic
    // Periodically pick a new random target position within a small radius
    if (Math.random() < 0.01 && !isWalking.current) {
       // Random position between -2 and 2 on X axis
       const newX = (Math.random() - 0.5) * 4;
       // Random position between -1 and 1 on Z axis
       const newZ = (Math.random() - 0.5) * 2;
       targetPos.current.set(newX, -0.5, newZ);
       isWalking.current = true;
    }

    const currentPos = groupRef.current.position;
    const distance = currentPos.distanceTo(targetPos.current);

    if (distance > 0.1) {
      // Move towards target
      currentPos.lerp(targetPos.current, delta * 2);

      // Face the direction of movement
      const direction = new THREE.Vector3().subVectors(targetPos.current, currentPos).normalize();
      const targetRotation = Math.atan2(direction.x, direction.z);
      // Smoothly rotate body
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.1);

      // Walking Animation
      const time = state.clock.getElapsedTime();
      const speed = 10; // Walking speed multiplier

      // Leg swing (sine wave)
      leftLegRef.current.rotation.x = Math.sin(time * speed) * 0.5;
      rightLegRef.current.rotation.x = Math.sin(time * speed + Math.PI) * 0.5;

      // Arm swing (opposite to legs)
      leftArmRef.current.rotation.x = Math.sin(time * speed + Math.PI) * 0.3;
      rightArmRef.current.rotation.x = Math.sin(time * speed) * 0.3;

      // Body bobbing (up and down)
      currentPos.y = -0.5 + Math.sin(time * speed * 2) * 0.1;
    } else {
      isWalking.current = false;
      // Idle Animation (reset limbs smoothly)
      leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
      rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);

      // Gentle idle breathing/bobbing
      const time = state.clock.getElapsedTime();
      currentPos.y = -0.5 + Math.sin(time * 2) * 0.05;

      // Slowly rotate body back to front when idle
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.05);
    }
  });

  // Materials
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color, roughness: 0.3 }), [color]);
  const skinMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f5d0b5", roughness: 0.4 }), []); // Base skin tone

  // Array of materials for the head (cube). Index 4 is the positive Z face (front).
  const headMaterials = useMemo(() => {
    const faceMaterial = new THREE.MeshStandardMaterial({ map: faceTexture, roughness: 0.4 });
    return [
      skinMaterial, // right
      skinMaterial, // left
      skinMaterial, // top
      skinMaterial, // bottom
      faceMaterial, // front
      skinMaterial, // back
    ];
  }, [faceTexture, skinMaterial]);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        {headMaterials.map((mat, i) => (
          <primitive key={i} object={mat} attach={`material-${i}`} />
        ))}
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.7, 0]} castShadow material={bodyMaterial}>
        <boxGeometry args={[1.2, 1.2, 0.6]} />
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.8, 0.9, 0]} castShadow material={bodyMaterial}>
        {/* Offset geometry so rotation happens at the "shoulder" */}
        <boxGeometry args={[0.3, 1, 0.3]} />
        <mesh position={[0, -0.4, 0]} />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.8, 0.9, 0]} castShadow material={bodyMaterial}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <mesh position={[0, -0.4, 0]} />
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.3, 0.1, 0]} castShadow material={bodyMaterial}>
        {/* Offset geometry so rotation happens at the "hip" */}
        <boxGeometry args={[0.4, 1, 0.4]} />
        <mesh position={[0, -0.4, 0]} />
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.3, 0.1, 0]} castShadow material={bodyMaterial}>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <mesh position={[0, -0.4, 0]} />
      </mesh>
    </group>
  );
}

export default function SiteAvatar({ accent }: { accent?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const color = accent || "#e50914";

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        shadows
        eventSource={typeof window !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color={color} />
        <Environment preset="city" />

        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Avatar color={color} />
          </Suspense>
        </ErrorBoundary>

        <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2} far={4} color={color} />
      </Canvas>
    </div>
  );
}
