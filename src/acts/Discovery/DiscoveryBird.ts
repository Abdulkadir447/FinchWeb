import * as THREE from 'three';

export class DiscoveryBird {
  private mesh: THREE.Group | null = null;
  private animationTime = 0;
  private eyeTimer = 0;

  addToScene(scene: THREE.Scene): void {
    // Create bird model
    this.mesh = new THREE.Group();

    // Bird body
    const bodyGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b7355,
      roughness: 0.8,
      metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.2;
    this.mesh.add(body);

    // Bird head
    const headGeometry = new THREE.SphereGeometry(0.14, 12, 12);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b7355,
      roughness: 0.8,
      metalness: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0.24, 0.18);
    this.mesh.add(head);

    // Bird beak
    const beakGeometry = new THREE.ConeGeometry(0.04, 0.12, 8);
    const beakMaterial = new THREE.MeshStandardMaterial({
      color: 0xffa500,
      roughness: 0.8,
      metalness: 0.1
    });
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0, 0.24, 0.32);
    beak.rotation.x = -Math.PI / 2;
    this.mesh.add(beak);

    // Bird eye
    const eyeGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.8,
      metalness: 0.1
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.05, 0.27, 0.28);
    this.mesh.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.05, 0.27, 0.28);
    this.mesh.add(rightEye);

    // Add subtle feathers (using InstancedMesh for performance)
    this.addFeathers();

    // Initial position (hidden, will be revealed)
    this.mesh.scale.setScalar(0.1);
    this.mesh.position.set(0, -1.5, 0);
    this.mesh.rotation.set(0, Math.PI * 2, 0);

    scene.add(this.mesh);
  }

  update(localProgress: number, globalProgress: number): void {
    this.animationTime += 0.05;

    // Breathing animation
    const breathe = Math.sin(this.animationTime * 0.8) * 0.03;
    this.mesh?.scale.setScalar(0.1 + breathe);

    // Head turn with global progression
    const head = this.mesh?.children[1];
    if (head) {
      const headTurn = Math.sin(globalProgress * Math.PI * 1.5) * 0.15;
      head.rotation.y = headTurn;
    }

    // Eye blink with rhythm
    this.eyeTimer += 0.05;
    const blinkProgress = (Math.sin(this.eyeTimer * 8) + 1) / 2;
    const blinkAmount = Math.sin(blinkProgress * Math.PI) * 0.5;

    // Eyes close
    const leftEye = this.mesh?.children[4];
    const rightEye = this.mesh?.children[5];
    if (leftEye && rightEye) {
      const scale = Math.max(1 - blinkAmount, 0.2);
      leftEye.scale.setScalar(scale);
      rightEye.scale.setScalar(scale);
    }

    // Bird reveal animation
    const revealProgress = Math.min(localProgress * 3, 1);
    this.mesh?.scale.setScalar(0.1 + revealProgress * 0.9);
    if (this.mesh) {
      this.mesh.position.y = -1.5 + revealProgress * 1.5;
    }

    // Subtle wing flapping (very subtle)
    const wingProgress = (localProgress % 1) * 2 * Math.PI;
    if (this.mesh) {
      this.mesh.rotation.z = Math.sin(wingProgress) * 0.05;
    }
  }

  private addFeathers(): void {
    if (!this.mesh) return;

    // Create feather particles (less expensive than actual geometry)
    const featherCount = 50;
    const featherGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(featherCount * 3);
    const rotations = new Float32Array(featherCount);
    const alphas = new Float32Array(featherCount);

    for (let i = 0; i < featherCount; i++) {
      const angle = (i * Math.PI * 2) / featherCount;
      const radius = 0.35;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(i % 5) * 0.05;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      rotations[i] = angle;
      alphas[i] = Math.random() * 0.3;
    }

    featherGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    featherGeometry.setAttribute('rotation', new THREE.BufferAttribute(rotations, 1));
    featherGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const featherMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        alpha: { value: 1 },
      },
      vertexShader: `
        attribute float rotation;
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec3 pos = position;
          pos.x += cos(rotation) * (0.3 + sin(time * 0.5) * 0.1);
          pos.y += sin(rotation) * 0.02;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        uniform float alpha;
        void main() {
          float finalAlpha = vAlpha * alpha;
          gl_FragColor = vec4(0.6, 0.4, 0.2, finalAlpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const feathers = new THREE.Points(featherGeometry, featherMaterial);
    this.mesh.add(feathers);
  }

  removeFromScene(scene: THREE.Scene): void {
    if (this.mesh) {
      scene.remove(this.mesh);
      // Dispose geometry and materials to prevent memory leaks
      this.mesh.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this.mesh = null;
    }
  }

  getMesh(): THREE.Group | null {
    return this.mesh;
  }

  dispose(): void {
    if (this.mesh) {
      this.mesh.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this.mesh = null;
    }
  }
}