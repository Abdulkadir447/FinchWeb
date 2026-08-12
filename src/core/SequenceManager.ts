import type { SequenceId } from '../types/sequence';

// SequenceManager: Orchestrates act progression via timeline
// Defines sequences as timeline ranges for each act
// Ensures smooth transitions between acts

export interface Sequence {
  id: SequenceId;
  start: number;
  end: number;
}

// Management class for act sequences
// Coordinates with Timeline and Director
// Handles progressive act transitions

export class SequenceManager {
  private readonly sequences: Sequence[];

  constructor(sequences: Sequence[]) {
    this.sequences = sequences;
  }

  // Get active sequence based on timeline progress
  public getCurrent(progress: number): Sequence | null {
    for (const sequence of this.sequences) {
      if (progress >= sequence.start && progress <= sequence.end) {
        return sequence;
      }
    }
    return null;
  }

  // Get all registered sequences
  public getAll(): readonly Sequence[] {
    return this.sequences;
  }

  // Register a new sequence definition
  public register(seq: Sequence): void {
    this.sequences.push(seq);
  }
}