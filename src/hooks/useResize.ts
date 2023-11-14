const arrResizeListeners: (() => void)[] = [];

window.addEventListener("resize", () => {
  arrResizeListeners.forEach(listener => listener());
});

export function useResize() {
  function addOnResize(listener: () => void) {
    arrResizeListeners.push(listener);
    const index = arrResizeListeners.length - 1;

    return () => {
      arrResizeListeners.splice(index, 1);
    }
  }

  function reTrigger() {
    arrResizeListeners.forEach(listener => listener());
  }

  return {
    addOnResize,
    reTrigger
  }
}
