"use client";

import { useEffect, useRef } from "react";
// We use require to prevent SSR issues since webgl-fluid requires the DOM.
// Alternatively, we dynamically import in the useEffect.

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const initFluid = async () => {
      try {
        const webGLFluidEnhanced = (await import("webgl-fluid")).default;
        
        webGLFluidEnhanced(canvasRef.current, {
          IMMEDIATE: true,
          TRIGGER: "hover",
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 1024,
          CAPTURE_RESOLUTION: 512,
          DENSITY_DISSIPATION: 1,
          VELOCITY_DISSIPATION: 0.2,
          PRESSURE: 0.8,
          PRESSURE_ITERATIONS: 20,
          CURL: 30,
          SPLAT_RADIUS: 0.25,
          SPLAT_FORCE: 6000,
          SHADING: true,
          COLORFUL: true,
          COLOR_UPDATE_SPEED: 10,
          PAUSED: false,
          BACK_COLOR: { r: 250, g: 250, b: 250 }, // Matches #FAFAFA
          TRANSPARENT: true,
          BLOOM: true,
          BLOOM_ITERATIONS: 8,
          BLOOM_RESOLUTION: 256,
          BLOOM_INTENSITY: 0.8,
          BLOOM_THRESHOLD: 0.6,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: true,
          SUNRAYS_RESOLUTION: 196,
          SUNRAYS_WEIGHT: 1.0,
        });
      } catch (err) {
        console.error("Fluid cursor failed to initialize", err);
      }
    };

    initFluid();

    return () => {
      // Cleanup if needed
      // Note: webgl-fluid doesn't explicitly document a destroy method natively, 
      // but we ensure it only binds to this canvas.
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none w-screen h-screen"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
