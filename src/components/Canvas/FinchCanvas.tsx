import React from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from '../../app/Experience';

// FinchCanvas: Single React Three Fiber canvas rendering the Experience
// Handles DPR, shadows, camera, and performance settings
export default function FinchCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 75 }}
      shadows
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true
      }}
    >
      <Experience />
    </Canvas>
  );
}