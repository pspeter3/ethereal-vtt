import { cx } from "./cx";

export const focusStyle = cx("focus:outline-none", "focus:shadow-outline");

export const fieldStyle = cx(
    "appearance-none",
    "border-2",
    "focus:border-indigo-500",
    "h-12",
    "px-4",
    "rounded",
    "text-gray-900",
    "w-full",
    focusStyle,
);
