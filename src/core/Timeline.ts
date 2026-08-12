export class Timeline {
  private progress = 0;

  /**
   * Set normalized progress.
   * Value is always clamped between 0 and 1.
   */
  setProgress(progress: number) {
    this.progress = Math.min(1, Math.max(0, progress));
  }

  /**
   * Current normalized progress.
   */
  getProgress() {
    return this.progress;
  }

  /**
   * Returns true if progress lies inside a section.
   */
  isBetween(start: number, end: number) {
    return this.progress >= start && this.progress <= end;
  }

  /**
   * Returns local progress inside a section.
   *
   * Example:
   * global = 0.45
   * section = 0.40 -> 0.60
   * local = 0.25
   */
  getSectionProgress(start: number, end: number) {
    const value = (this.progress - start) / (end - start);

    return Math.min(1, Math.max(0, value));
  }

  /**
 * Returns whether the timeline has passed a point.
 */
hasPassed(point: number) {
  return this.progress >= point;
}

  /**
   * Reset timeline.
   */
  reset() {
    this.progress = 0;
  }
}