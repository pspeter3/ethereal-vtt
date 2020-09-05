import { useEffect, useErrorBoundary, useState } from "preact/hooks";

/**
 * useError is a hook for the errors within the application.
 */
export function useError(): Error | ErrorEvent | null {
    const [error] = useErrorBoundary();
    const [errorEvent, setErrorEvent] = useState<ErrorEvent | null>(null);
    useEffect(() => {
        window.addEventListener("error", setErrorEvent);
        return () => window.removeEventListener("error", setErrorEvent);
    }, []);
    return error || errorEvent || null;
}
