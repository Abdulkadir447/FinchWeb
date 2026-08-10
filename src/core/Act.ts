// Act: Base abstraction for cinematic acts
// Each act encapsulates its own lifecycle: enter, update, exit

export interface Act {
  readonly name: string;
  readonly startProgress: number;
  readonly endProgress: number;

  // Called when this act becomes active
  enter(): void;

  // Called every frame with local progress (0-1 within this act's range)
  update(localProgress: number): void;

  // Called when transitioning away from this act
  exit(): void;

  // Optional: cleanup resources
  dispose?(): void;
}

// Abstract base class for common act functionality
export abstract class BaseAct implements Act {
  abstract readonly name: string;
  abstract readonly startProgress: number;
  abstract readonly endProgress: number;

  protected isActive = false;

  enter(): void {
    this.isActive = true;
    this.onEnter();
  }

  update(localProgress: number): void {
    if (this.isActive) {
      this.onUpdate(localProgress);
    }
  }

  exit(): void {
    this.isActive = false;
    this.onExit();
  }

  dispose(): void {
    this.onDispose();
  }

  // Override in subclasses
  protected abstract onEnter(): void;
  protected abstract onUpdate(localProgress: number): void;
  protected abstract onExit(): void;
  protected onDispose(): void {}
}