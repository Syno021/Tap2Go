// src/polyfills.ts
// React Native Reanimated web polyfills
// This must be imported BEFORE any other imports in your app

// Global polyfills for both Node.js-like and browser environments
let frameId = 0;
const timeouts = new Map<number, NodeJS.Timeout>();

// Polyfill for global (Node.js-like) environment
if (typeof global !== 'undefined') {
  if (typeof global.requestAnimationFrame === 'undefined') {
    global.requestAnimationFrame = function (callback: FrameRequestCallback): number {
      const id = ++frameId;
      const timeoutId = setTimeout(() => {
        timeouts.delete(id);
        callback(Date.now());
      }, 16); // ~60fps
      timeouts.set(id, timeoutId);
      return id;
    };
  }

  if (typeof global.cancelAnimationFrame === 'undefined') {
    global.cancelAnimationFrame = function (id: number): void {
      const timeoutId = timeouts.get(id);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeouts.delete(id);
      }
    };
  }
}

// Polyfill for browser environment
if (typeof window !== 'undefined') {
  // Only polyfill if not already available
  if (typeof window.requestAnimationFrame === 'undefined') {
    window.requestAnimationFrame = function (callback: FrameRequestCallback): number {
      const id = ++frameId;
      const timeoutId = setTimeout(() => {
        timeouts.delete(id);
        callback(Date.now());
      }, 16);
      timeouts.set(id, timeoutId);
      return id;
    };
  }

  if (typeof window.cancelAnimationFrame === 'undefined') {
    window.cancelAnimationFrame = function (id: number): void {
      const timeoutId = timeouts.get(id);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeouts.delete(id);
      }
    };
  }
}

// Additional polyfills for React Native web environment
if (typeof globalThis !== 'undefined') {
  if (typeof globalThis.requestAnimationFrame === 'undefined') {
    globalThis.requestAnimationFrame = function (callback: FrameRequestCallback): number {
      const id = ++frameId;
      const timeoutId = setTimeout(() => {
        timeouts.delete(id);
        callback(Date.now());
      }, 16);
      timeouts.set(id, timeoutId);
      return id;
    };
  }

  if (typeof globalThis.cancelAnimationFrame === 'undefined') {
    globalThis.cancelAnimationFrame = function (id: number): void {
      const timeoutId = timeouts.get(id);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeouts.delete(id);
      }
    };
  }
}