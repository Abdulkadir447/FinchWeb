import React from 'react';
import { useThree } from '@react-three/fiber';

// Atmosphere: Creates fog and environmental effects
// Minimal implementation with basic fog and sky
import * as THREE from 'three';

export default function Atmosphere() {
  const { scene } = useThree();

  React.useEffect(() => {
    // Basic fog setup - adjust parameters as needed
    scene.fog = new THREE.FogExp2(0x1a1a2e, 0.015);
    scene.background = new THREE.Color(0x1a1a2e);
  }, [scene]);

  return null;
}