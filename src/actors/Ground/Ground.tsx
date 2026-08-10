import React from 'react';

// Ground: A simple dark ground plane
// Large surface, minimal, no textures

export default function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={0x111111} />
    </mesh>
  );
}
