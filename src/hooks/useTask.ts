import { useEffect } from "preact/hooks";
import { AsyncState, useAsync } from "./useAsync";

/**
 * Execute an async function as a hook.
 * @param task Task to execute.
 * @param deps Dependencis for the task.
 */
export function useTask<R>(
    task: () => Promise<R>,
    deps: unknown[],
): AsyncState<R> {
    const [state, invoke] = useAsync(task, deps);
    useEffect(() => invoke(), [invoke]);
    return state;
}
