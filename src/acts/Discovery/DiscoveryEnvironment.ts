import * as THREE from 'three';

export class DiscoveryEnvironment {
  private group: THREE.Group | null = null;
  private leaves: THREE.Points | null = null;
  private leafCount = 80;
  private clock = new THREE.Clock();

  addToScene(scene: THREE.Scene): void {
    this.group = new THREE.Group();

    // Create tree
    this.createTree();

    // Create ground fog effect via particles
    this.createGroundFog();

    scene.add(this.group);
  }

  private createTree(): void {
    if (!this.group) return;

    const tree = new THREE.Group();

    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 6, 12);
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3728,
      roughness: 0.9,
      metalness: 0.0,
      side: THREE.DoubleSide
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 3;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);

    // Main canopy
    const canopyGeometry = new THREE.SphereGeometry(2.5, 16, 16);
    const canopyMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5a27,
      roughness: 0.9,
      metalness: 0.1
    });
    const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
    canopy.position.y = 5;
    tree.add(canopy);

    // Secondary canopy clusters for natural look
    const secondaryGeometry = new THREE.SphereGeometry(1.2, 12, 12);
    const secondaryMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5a27,
      roughness: 0.9,
      metalness: 0.1
    });

    for (let i = 0; i < 3; i++) {
      const cluster = new THREE.Mesh(secondaryGeometry, secondaryMaterial);
      cluster.position.y = 4 + Math.random();
      cluster.position.x = (Math.random() - 0.5) * 3;
      cluster.position.z = (Math.random() - 0.5) * 3;
      tree.add(cluster);
    }

    // Position tree behind bird
    tree.position.set(-3, 0, -4);
    this.group.add(tree);
  }

  private createGroundFog(): void {
    if (!this.group) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.leafCount * 3);
    const velocities = new Float32Array(this.leafCount * 3);

    for (let i = 0; i < this.leafCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = 0.1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = 0.001 + Math.random() * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3,
      transparent: true,
      opacity: 0.05,
      sizeAttenuation: true
    });

    this.leaves = new THREE.Points(geometry, material);
    this.group.add(this.leaves);
  }

  update(localProgress: number): void {
    if (!this.leaves) return;

    const positions = this.leaves.geometry.attributes.position.array as Float32Array;
    const velocities = this.leaves.geometry.attributes.velocity.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      // Reset leaves when they rise too high
      if (positions[i + 1] > 1.5) {
        positions[i + 1] = 0.1;
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 2] = (Math.random() - 0.5) * 15;
      }
    }

    this.leaves.geometry.attributes.position.needsUpdate = true;

    // Subtle tree sway based on progress
    const tree = this.group?.children[0] as THREE.Group | undefined;
    if (tree) {
      const sway = Math.sin(localProgress * Math.PI) * 0.05;
      tree.rotation.y = sway;
    }
  }

  removeFromScene(scene: THREE.Scene): void {
    if (this.group) {
      scene.remove(this.group);
    }
  }

  dispose(): void {
    if (!this.group) return;

    this.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
      if (obj instanceof THREE.Points) {
        obj.geometry.dispose();
        if (obj.material instanceof THREE.Material) {
          obj.material.dispose();
        }
      }
    });
    this.group = null;
    this.leaves = null;
  }
}