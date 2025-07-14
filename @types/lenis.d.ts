declare module '@studio-freight/lenis' {
    export default class Lenis {
      constructor(options?: {
        duration?: number;
        easing?: (t: number) => number;
        smoothWheel?: boolean;
        smoothTouch?: boolean;
        touchMultiplier?: number;
      });
      
      raf(time: number): void;
      destroy(): void;
    }
  }