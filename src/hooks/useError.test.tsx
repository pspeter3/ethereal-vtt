import { FunctionComponent, h } from "preact";
import { render, screen } from "@testing-library/preact";
import { useError } from "./useError";
import { act } from "preact/test-utils";

describe("useError", () => {
    it("should handle component errors", () => {
        const message = "ComponentError";
        const Child: FunctionComponent = () => {
            throw new Error(message);
        };
        const Example: FunctionComponent = () => {
            const error = useError();
            return error === null ? (
                <Child />
            ) : (
                <pre aria-label="error">{error.message}</pre>
            );
        };
        render(<Example />);
        expect(screen.getByLabelText("error")).toHaveTextContent(message);
    });

    it("should handle window events", () => {
        const message = "WindowError";
        const Example: FunctionComponent = () => {
            const error = useError();
            return error === null ? null : (
                <pre aria-label="error">{error.message}</pre>
            );
        };
        render(<Example />);
        expect(screen.queryByLabelText("error")).toBeNull();
        act(() => {
            window.dispatchEvent(new ErrorEvent("error", { message }));
        });
        expect(screen.getByLabelText("error")).toHaveTextContent(message);
    });
});
