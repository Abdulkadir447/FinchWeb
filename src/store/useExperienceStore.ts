import { create } from "zustand";

export interface ExperienceState {
  /**
   * Normalized timeline progress.
   * Always between 0 and 1.
   */
  progress: number;

  /**
   * Current scene identifier.
   */
  currentScene: string;

  /**
   * Whether all assets have finished loading.
   */
  ready: boolean;

  /**
   * Debug mode.
   */
  debug: boolean;

  /**
   * Set normalized progress.
   */
  setProgress: (progress: number) => void;

  /**
   * Change current scene.
   */
  setScene: (scene: string) => void;

  /**
   * Mark experience as ready.
   */
  setReady: (ready: boolean) => void;

  /**
   * Toggle debug mode.
   */
  toggleDebug: () => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  progress: 0,

  currentScene: "observer",

  ready: false,

  debug: false,

  setProgress: (progress) =>
    set({
      progress: Math.min(1, Math.max(0, progress)),
    }),

  setScene: (scene) =>
    set({
      currentScene: scene,
    }),

  setReady: (ready) =>
    set({
      ready,
    }),

  toggleDebug: () =>
    set((state) => ({
      debug: !state.debug,
    })),
}));