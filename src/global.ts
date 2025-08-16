// Place this at the very top of your app entry point (App.js/App.tsx or index.js)
// BEFORE any other imports, especially before react-native-reanimated

let frameId = 0;

if (typeof global.requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = function (callback: FrameRequestCallback): number {
    const id = ++frameId;
    setTimeout(() => callback(Date.now()), 16); // ~60fps
    return id;
  };
}

if (typeof global.cancelAnimationFrame === 'undefined') {
  global.cancelAnimationFrame = function (id: number): void {
    // Note: This is a simplified implementation
    // In a real polyfill, you'd track timeouts by ID
    clearTimeout(id);
  };
}

// Alternative: More complete polyfill
/*
const timeouts = new Map<number, NodeJS.Timeout>();

if (typeof global.requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = function (callback: FrameRequestCallback): number {
    const id = ++frameId;
    const timeoutId = setTimeout(() => {
      timeouts.delete(id);
      callback(Date.now());
    }, 16);
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
*/