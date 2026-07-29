import { Timeline } from "./Timeline";

export class Director {
  private timeline: Timeline;

  constructor(timeline: Timeline) {
    this.timeline = timeline;
  }

  update(progress: number): void {
    this.timeline.setProgress(progress);
  }

  getTimeline(): Timeline {
    return this.timeline;
  }

  reset(): void {
    this.timeline.reset();
  }
}