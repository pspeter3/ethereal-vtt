import { FunctionComponent, h } from "preact";
import { cx } from "../cx";
import { bordered, controllable, focusable, labeled, rounded } from "../styles";

export const SubmitButton: FunctionComponent<{ onClick?: () => void }> = ({
    onClick,
    children,
}) => (
    <button
        type="submit"
        onClick={onClick}
        className={cx(
            "flex",
            "focus:bg-blue-800",
            "focus:border-blue-400",
            "focus:text-blue-300",
            "font-bold",
            "h-12",
            "hover:bg-gray-800",
            "items-center",
            "justify-center",
            "px-4",
            "w-full",
            bordered,
            controllable,
            focusable,
            labeled,
            rounded,
        )}
    >
        {children}
    </button>
);

SubmitButton.displayName = "SubmitButton";
