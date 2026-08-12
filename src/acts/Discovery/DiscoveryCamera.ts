import * as THREE from 'three';

export class DiscoveryCamera {
  private camera: THREE.Camera | null = null;
  private currentPosition: THREE.Vector3 = new THREE.Vector3(0, 5, 20);
  private currentTarget: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  setCamera(camera: THREE.Camera): void {
    this.camera = camera;
  }

  update(localProgress: number): void {
    if (!this.camera) return;

    const t = Math.min(localProgress * 1.5, 1);
    const damped = 1 - Math.exp(-t * 2.5);

    const startPos = new THREE.Vector3(0, 5, 20);
    const endPos = new THREE.Vector3(0, 2, 8);
    const startTarget = new THREE.Vector3(0, 0, 0);
    const endTarget = new THREE.Vector3(0, 0.5, 0);

    this.currentPosition.lerpVectors(startPos, endPos, damped);
    this.currentTarget.lerpVectors(startTarget, endTarget, damped);

    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentTarget);
  }

  getPosition(): THREE.Vector3 {
    return this.currentPosition;
  }

  getTarget(): THREE.Vector3 {
    return this.currentTarget;
  }
}