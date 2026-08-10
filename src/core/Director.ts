import type { Act } from './Act';
import { Timeline } from './Timeline';
import { SequenceManager } from './SequenceManager';

export default class Director {
  private currentAct: Act | null = null;
  private timeline: Timeline;
  private sequenceManager: SequenceManager;
  private acts: Map<string, Act> = new Map();

  constructor(timeline: Timeline, sequenceManager: SequenceManager, acts: Act[] = []) {
    this.timeline = timeline;
    this.sequenceManager = sequenceManager;
    acts.forEach(act => this.registerAct(act));
  }

  public registerAct(act: Act): void {
    this.acts.set(act.name, act);
  }

  public transitionTo(actName: string): void {
    const act = this.acts.get(actName);
    if (!act || this.currentAct === act) return;

    if (this.currentAct) {
      this.currentAct.exit();
    }

    this.currentAct = act;
    act.enter();
  }

  public update(progress: number): void {
    if (!this.currentAct) return;
    const localProgress = this.getSectionProgress(this.currentAct.startProgress, this.currentAct.endProgress);
    this.currentAct.update(localProgress);
  }

  private getSectionProgress(start: number, end: number): number {
    return Math.min(1, Math.max(0, (this.timeline.getProgress() - start) / (end - start)));
  }

  public getTimeline(): Timeline {
    return this.timeline;
  }

  public reset(): void {
    if (this.currentAct) {
      this.currentAct.exit();
      this.currentAct = null;
    }
    this.timeline.reset();
  }
}