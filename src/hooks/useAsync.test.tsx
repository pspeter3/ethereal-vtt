import { FunctionComponent, h } from "preact";
import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
} from "@testing-library/preact";
import { AsyncStatus, useAsync } from "./useAsync";

describe("useAsync", () => {
    const Example: FunctionComponent<{ task: () => Promise<string> }> = ({
        task,
    }) => {
        const [state, invoke] = useAsync(task);
        return (
            <div>
                <span>{state.status.toString()}</span>
                {state.status === AsyncStatus.Success ? (
                    <span>{state.result}</span>
                ) : null}
                {state.status === AsyncStatus.Error ? (
                    <span>{state.error.message}</span>
                ) : null}
                <button onClick={invoke}>Invoke</button>
            </div>
        );
    };

    function expectStatus(status: AsyncStatus): never | void {
        screen.getByText(status.toString());
    }

    function createTask(mock: jest.Mock): () => Promise<string> {
        return () => new Promise((resolve, reject) => mock(resolve, reject));
    }

    async function resolveTask(mock: jest.Mock, value: string): Promise<void> {
        await act(() => Promise.resolve(mock.mock.calls[0][0](value)));
    }

    async function rejectTask(mock: jest.Mock, value: string): Promise<void> {
        await act(() =>
            Promise.resolve(mock.mock.calls[0][1](new Error(value))),
        );
    }

    /* eslint-disable jest/expect-expect */
    it("should not throw an error after unmount", async () => {
        const mock = jest.fn();
        render(<Example task={createTask(mock)} />);
        expectStatus(AsyncStatus.Idle);
        fireEvent.click(screen.getByText("Invoke"));
        expectStatus(AsyncStatus.Loading);
        cleanup();
        await resolveTask(mock, "");
    });
    /* eslint-enable jest/expect-expect */

    it("should resolve a task", async () => {
        const result = Math.random().toString(16);
        const mock = jest.fn();
        render(<Example task={createTask(mock)} />);
        expectStatus(AsyncStatus.Idle);
        fireEvent.click(screen.getByText("Invoke"));
        expectStatus(AsyncStatus.Loading);
        await resolveTask(mock, result);
        expectStatus(AsyncStatus.Success);
        expect(screen.queryByText(result)).not.toBeNull();
    });

    it("should reject a task", async () => {
        const result = Math.random().toString(16);
        const mock = jest.fn();
        render(<Example task={createTask(mock)} />);
        expectStatus(AsyncStatus.Idle);
        fireEvent.click(screen.getByText("Invoke"));
        expectStatus(AsyncStatus.Loading);
        await rejectTask(mock, result);
        expectStatus(AsyncStatus.Error);
        expect(screen.queryByText(result)).not.toBeNull();
    });
});
