import { classnames } from "tailwindcss-classnames";

export const focusStyle = classnames(
    "focus:outline-none",
    "focus:shadow-outline",
);

export const fieldStyle = classnames(
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
