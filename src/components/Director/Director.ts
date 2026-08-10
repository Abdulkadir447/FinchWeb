import * as THREE from "three";
import { useExperienceStore } from "../../store/useExperienceStore";

// Director: Core Engine Architecture
// Implements the state machine for act sequencing
// State Machine Flow:
//     → Act-specific camera targets
//     → Asynchronous scene transitions
//     → Editor-driven playback control

export default class Director {
  private currentActIndex: number = 0;
  private acts: string[] = [
    "Discovery",
    "Understanding",
    "Observer",
    "Trust",
    "Finch"
  ];

  private activeScene: THREE.Mesh|null = null;
  private isTransitioning: boolean = false;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.currentActIndex = 0;
    this.isTransitioning = false;
    this.activeScene = null;
  }

  public update(delta: number): void {
    if(this.isTransitioning) {
      // Update transition progress from store
      const store = useExperienceStore();
      const progress = store.state.transitionProgress;

      if(progress >= 1.0) {
        this.completeSceneTransition();
      }
    }
  }

  private completeSceneTransition(): void {
    this.isTransitioning = false;
    this.activeScene?.geometry.dispose();
    this.activeScene = null;
    console.log(`Transition complete: ${this.acts[this.currentActIndex]}`);
  }

  public nextSequence(): void {
    if(this.isTransitioning) return;
    this.currentActIndex = (this.currentActIndex + 1) % this.acts.length;
    console.log(`Requesting scene change: ${this.currentActIndex}`);
    this.startSceneTransition();
  }

  private startSceneTransition(): void {
    this.isTransitioning = true;
    const store = useExperienceStore();
    store.setTransitionSettings({
      targetScene: this.acts[this.currentActIndex]
    });

    // Initialize placeholder camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 5, 10);
    store.setCameraTargetCamera(camera)⁣