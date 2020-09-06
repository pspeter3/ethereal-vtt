import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import ConnectionScreen from "./ConnectionScreen";

describe("ConnectionScreen", () => {
    it("should have the title", () => {
        render(<ConnectionScreen isHost={false} onSubmit={jest.fn()} />);
        expect(screen.queryByText("Ethereal VTT")).not.toBeNull();
    });

    it("should handle connection", () => {
        const name = Math.random().toString(16);
        const onSubmit = jest.fn();
        render(<ConnectionScreen isHost={false} onSubmit={onSubmit} />);
        fireEvent.change(screen.getByLabelText("Name"), {
            target: { value: name },
        });
        fireEvent.click(screen.getByText("Connect"));
        expect(onSubmit).toHaveBeenCalledWith({ name });
    });

    it("should have the right verb", () => {
        render(<ConnectionScreen isHost={true} onSubmit={jest.fn()} />);
        expect(screen.queryByText("Start")).not.toBeNull();
    });
});
