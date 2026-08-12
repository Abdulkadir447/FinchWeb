import { Director } from './Director';

// CameraController: Manages camera behavior based on Director state
// Connects to Director to receive progress updates and act changes
export interface CameraTarget {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
}

export default class CameraController {
  private director: Director;
  private targets: Record<string, CameraTarget>;

  constructor(director: Director) {
    this.director = director;
    this.targets = {
      Discovery: { position: new THREE.Vector3(0, 0, 10), lookAt: new THREE.Vector3(0, -1, 0) },
      Understanding: { position: new THREE.Vector3(0, 0, 15), lookAt: new THREE.Vector3(0, -1, 0) },
      Observer: { position: new THREE.Vector3(0, 0, 20), lookAt: new THREE.Vector3(0, -1, 0) },
      Trust: { position: new THREE.Vector3(0, 0, 25), lookAt: new THREE.Vector3(0, -1, 0) },
      Finch: { position: new THREE.Vector3(0, 0, 30), lookAt: new THREE.Vector3(0, -1, 0) }
    };
    this.update();
  }

  // Called by external logic when Director progress changes
  public update(): void {
    const currentAct = this.director.getCurrentAct();
    const target = this.targets[currentAct] || this.targets.Discovery;
    this.applyToCamera(target);
  }

  // Apply camera positioning for the given act
  private applyToCamera(target: CameraTarget): void {
    // In a complete implementation, this would interpolate camera
    // position toward target.position and target.lookAt
  }
}