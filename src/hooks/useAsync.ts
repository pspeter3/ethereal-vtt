import { useCallback, useState } from "preact/hooks";

/**
 * AsyncStatus represents the async status.
 */
export enum AsyncStatus {
    Idle,
    Loading,
    Success,
    Error,
}

/**
 * AsyncIdleState represents the AsyncStatus.Idle state.
 */
export type AsyncIdleState = Readonly<{ status: AsyncStatus.Idle }>;
/**
 * AsyncLoadingState represents the AsyncStatus.Loading state.
 */
export type AsyncLoadingState = Readonly<{ status: AsyncStatus.Loading }>;
/**
 * AsyncSuccessState represents the AsyncStatus.Success state and the result.
 */
export type AsyncSuccessState<R> = Readonly<{
    status: AsyncStatus.Success;
    result: R;
}>;
/**
 * AsyncErrorState represents the AsyncStatus.Error state and the error.
 */
export type AsyncErrorState = Readonly<{
    status: AsyncStatus.Error;
    error: Error;
}>;
/**
 * AsyncState represents the type union of async states.
 */
export type AsyncState<R> =
    | AsyncIdleState
    | AsyncLoadingState
    | AsyncSuccessState<R>
    | AsyncErrorState;

/**
 * Wrap an async function as a hook.
 * @param task Task to execute.
 */
export function useAsync<R>(
    task: () => Promise<R>,
): [AsyncState<R>, () => void] {
    const [state, setState] = useState<AsyncState<R>>({
        status: AsyncStatus.Idle,
    });
    const invoke = useCallback(() => {
        setState({ status: AsyncStatus.Loading });
        task().then(
            (result) => setState({ status: AsyncStatus.Success, result }),
            (error) => setState({ status: AsyncStatus.Error, error }),
        );
    }, [task]);
    return [state, invoke];
}
