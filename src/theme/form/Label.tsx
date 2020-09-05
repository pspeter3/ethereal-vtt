import { h, FunctionComponent } from "preact";
import { cx } from "../cx";

export const Label: FunctionComponent<{ id: string }> = ({ id, children }) => (
    <label
        htmlFor={id}
        className={cx(
            "block",
            "font-bold",
            "leading-4",
            "pb-2",
            "text-gray-700",
        )}
    >
        {children}
    </label>
);

Label.displayName = "Label";
