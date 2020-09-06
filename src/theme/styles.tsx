import { cx } from "./cx";

export const focusable = cx("focus:outline-none", "focus:shadow-outline");

export const controllable = cx("appearance-none", focusable);

export const bordered = cx("border-2", "border-gray-600");
export const rounded = "rounded-lg";

export const labeled = cx(
    "block",
    "font-semibold",
    "leading-6",
    "text-gray-400",
    "tracking-wide",
);

export const inputable = cx(
    "bg-gray-900",
    "focus:border-blue-400",
    "h-12",
    "px-4",
    "text-gray-200",
    "w-full",
    bordered,
    controllable,
    focusable,
    rounded,
);
