import { useEffect } from "preact/hooks";
import { AsyncState, useAsync } from "./useAsync";

/**
 * Execute an async function as a hook.
 * @param task Task to execute.
 */
export function useTask<R>(task: () => Promise<R>): AsyncState<R> {
    const [state, invoke] = useAsync(task);
    useEffect(() => invoke(), [invoke]);
    return state;
}
