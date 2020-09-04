import { h, FunctionComponent } from "preact";
import { classnames } from "tailwindcss-classnames";

export const Label: FunctionComponent<{ id: string }> = ({ id, children }) => (
    <label
        htmlFor={id}
        className={classnames(
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
