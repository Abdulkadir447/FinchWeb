import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Director from '../core/Director';
import { Timeline } from '../core/Timeline';
import { SequenceManager } from '../core/SequenceManager';
import { DiscoveryAct } from '../acts/Discovery/DiscoveryAct';

export default function Experience() {
  const timelineRef = useRef<Timeline>();
  const directorRef = useRef<Director>();

  // Initialize core systems (Director, Timeline) - these don't need scene
  if (!timelineRef.current) {
    timelineRef.current = new Timeline();
  }
  if (!directorRef.current) {
    directorRef.current = new Director(
      timelineRef.current,
      new SequenceManager([]),
      [] // Acts will be registered after scene is available
    );
  }

  const timeline = timelineRef.current;
  const director = directorRef.current;

  // Connect scroll to timeline progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      timeline.setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [timeline]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
      />
      <DiscoveryScene director={director} timeline={timeline} />
    </>
  );
}

// This component runs inside Canvas, so it has access to the Three.js scene
function DiscoveryScene({ director, timeline }: {
  director: Director;
  timeline: Timeline;
}) {
  const { scene, camera } = useThree();
  const discoveryActRef = useRef<DiscoveryAct | null>(null);

  // Initialize DiscoveryAct with the scene (only once)
  useEffect(() => {
    if (!discoveryActRef.current) {
      discoveryActRef.current = new DiscoveryAct(scene);
      director.registerAct(discoveryActRef.current);
      director.transitionTo('Discovery');
    }
  }, [scene, director]);

  // Pass camera to DiscoveryAct
  useEffect(() => {
    if (discoveryActRef.current) {
      discoveryActRef.current.setCamera(camera);
    }
  }, [camera]);

  // Update director each frame
  useFrame(() => {
    director.update(timeline.getProgress());
  });

  return null; // DiscoveryAct manages its own scene objects
}

function Tree() {
  return (
    <group position={[-3, 0, -4]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.4, 6, 12]} />
        <meshStandardMaterial color={0x4a3728} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 5, 0]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshStandardMaterial color={0x2d5a27} />
      </mesh>
    </group>
  );
}

function Leaves() {
  const ref = useRef<THREE.Points>(null!);

  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.005;
        if (positions[i + 1] > 5) positions[i + 1] = 0;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const leafCount = 80;
  const positions = new Float32Array(leafCount * 3);
  for (let i = 0; i < leafCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = Math.random() * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={0xffffff}
        size={0.3}
        transparent
        opacity={0.05}
      />
    </points>
  );
}