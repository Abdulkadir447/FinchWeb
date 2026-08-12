import { BaseAct } from '../core/Act';
import * as THREE from 'three';

// DiscoveryAct: First cinematic act - the bird's introduction
// Contains bird model, tree, animated leaves, and camera sequence
export class DiscoveryAct extends BaseAct {
  readonly name = 'Discovery';
  readonly startProgress = 0;
  readonly endProgress = 0.2;

  private bird: THREE.Group | null = null;
  private tree: THREE.Group | null = null;
  private leaves: THREE.Points | null = null;
  private cameraTarget: THREE.Vector3 = new THREE.Vector3(0, 2, 10);

  protected onEnter(): void {
    this.createScene();
  }

  protected onUpdate(localProgress: number): void {
    // Animate camera through discovery sequence
    this.updateCamera(localProgress);

    // Animate bird based on progress
    this.animateBird(localProgress);

    // Animate leaves
    this.animateLeaves(localProgress);
  }

  protected onExit(): void {
    this.cleanup();
  }

  protected onDispose(): void {
    this.cleanup();
  }

  private createScene(): void {
    // Bird will be loaded from GLTF in actual implementation
    // For now, create placeholder geometry
    this.bird = new THREE.Group();

    // Bird body
    const bodyGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7355 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.bird.add(body);

    // Bird head
    const headGeometry = new THREE.SphereGeometry(0.15, 12, 12);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0.25, 0.35);
    this.bird.add(head);

    // Bird beak
    const beakGeometry = new THREE.ConeGeometry(0.05, 0.15, 8);
    const beakMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0, 0.25, 0.5);
    beak.rotation.x = -Math.PI / 2;
    this.bird.add(beak);

    // Tree placeholder
    this.tree = new THREE.Group();
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 1, 8, 12);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x4a3728 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 4;
    this.tree.add(trunk);

    // Tree crown
    const crownGeometry = new THREE.SphereGeometry(3, 16, 16);
    const crownMaterial = new THREE.MeshStandardMaterial({ color: 0x2d5a27 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 10;
    this.tree.add(crown);

    // Leaves particle system
    const leafCount = 200;
    const leafGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(leafCount * 3);
    const velocities = new Float32Array(leafCount * 3);
    const sizes = new Float32Array(leafCount);

    for (let i = 0; i < leafCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 3;
      const height = 6 + Math.random() * 6;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = -0.01 - Math.random() * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      sizes[i] = 0.1 + Math.random() * 0.15;
    }

    leafGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    leafGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    leafGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const leafMaterial = new THREE.PointsMaterial({
      color: 0x3a7d32,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    this.leaves = new THREE.Points(leafGeometry, leafMaterial);
  }

  private updateCamera(localProgress: number): void {
    // Camera starts wide, moves closer to bird
    const startPos = new THREE.Vector3(0, 5, 15);
    const endPos = new THREE.Vector3(0, 2.5, 6);

    this.cameraTarget.lerpVectors(startPos, endPos, localProgress);
  }

  private animateBird(localProgress: number): void {
    if (!this.bird) return;

    // Bird breathing animation
    const breathe = Math.sin(localProgress * Math.PI * 4) * 0.02;
    this.bird.scale.setScalar(1 + breathe);

    // Bird enters from below, rises into view
    const riseProgress = Math.min(localProgress * 3, 1);
    this.bird.position.y = -2 + riseProgress * 3;

    // Subtle head turn
    const head = this.bird.children[1];
    if (head) {
      head.rotation.y = Math.sin(localProgress * Math.PI * 2) * 0.2;
    }
  }

  private animateLeaves(localProgress: number): void {
    if (!this.leaves) return;

    const positions = this.leaves.geometry.attributes.position.array as Float32Array;
    const velocities = this.leaves.geometry.attributes.velocity.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      // Reset leaves that fall too low
      if (positions[i + 1] < 2) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 2 + Math.random() * 3;
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = 12;
        positions[i + 2] = Math.sin(angle) * radius;
      }
    }

    this.leaves.geometry.attributes.position.needsUpdate = true;
  }

  private cleanup(): void {
    if (this.bird) {
      this.bird.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this.bird = null;
    }

    if (this.tree) {
      this.tree.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this.tree = null;
    }

    if (this.leaves) {
      this.leaves.geometry.dispose();
      if (this.leaves.material instanceof THREE.Material) {
        this.leaves.material.dispose();
      }
      this.leaves = null;
    }
  }

  // Getters for Three.js scene integration
  getBird(): THREE.Group | null {
    return this.bird;
  }

  getTree(): THREE.Group | null {
    return this.tree;
  }

  getLeaves(): THREE.Points | null {
    return this.leaves;
  }

  getCameraTarget(): THREE.Vector3 {
    return this.cameraTarget;
  }
}