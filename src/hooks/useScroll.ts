import { useEffect, useRef, useState } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

export function useScroll() {
  const [ overlayScrollbar, setOverlayScrollbar ] = useState<OverlayScrollbars>();

  const refScrollbar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refScrollbar.current) {
      const os = OverlayScrollbars(refScrollbar.current, {
        scrollbars: {
          autoHide: 'scroll',
        },
      });

      setOverlayScrollbar(os);
    }
  }, [ ]);

  return {
    refScrollbar,
    overlayScrollbar,
  }
}
