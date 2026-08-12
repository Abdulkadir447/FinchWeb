import { BaseAct } from '../../core/Act';
import * as THREE from 'three';
import { DiscoveryCamera } from './DiscoveryCamera';
import { DiscoveryBird } from './DiscoveryBird';
import { DiscoveryEnvironment } from './DiscoveryEnvironment';

export class DiscoveryAct extends BaseAct {
  readonly name = 'Discovery';
  readonly startProgress = 0;
  readonly endProgress = 0.2;

  private camera: DiscoveryCamera;
  private bird: DiscoveryBird;
  private environment: DiscoveryEnvironment;
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    super();
    this.scene = scene;
    this.camera = new DiscoveryCamera();
    this.bird = new DiscoveryBird();
    this.environment = new DiscoveryEnvironment();
  }

  /**
   * Public API called by Experience to pass the R3F-controlled camera
   */
  setCamera(camera: THREE.Camera): void {
    this.camera.setCamera(camera);
  }

  protected onEnter(): void {
    this.environment.addToScene(this.scene);
    this.bird.addToScene(this.scene);
    const cam = this.scene.userData.threeCamera as THREE.Camera;
    if (cam) {
      this.setCamera(cam);
    } else {
      this.setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    }
  }

  protected onUpdate(localProgress: number): void {
    this.camera.update(localProgress);
    this.bird.update(localProgress, localProgress); // TODO: Pass both local and global progress
    this.environment.update(localProgress);
  }

  protected onExit(): void {
    this.environment.removeFromScene(this.scene);
    this.bird.removeFromScene(this.scene);
  }

  protected onDispose(): void {
    this.environment.dispose();
    this.bird.dispose();
  }
}