import { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import { VirtualTableTop } from "../vtt/VirtualTableTop";

/**
 * Hook to use a VirtualTableTop
 * @param ref Reference to the HTMLElement to contain the application.
 */
export function useVirtualTableTop(ref: RefObject<HTMLElement>): void {
    useEffect(() => {
        const container = ref.current;
        if (!container) {
            return;
        }
        const vtt = new VirtualTableTop(container);
        return () => vtt.destroy();
    }, [ref]);
}
