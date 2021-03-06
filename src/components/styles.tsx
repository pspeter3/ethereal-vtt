import { cx } from "../util/cx";

export const focusable = cx("focus:outline-none", "focus:shadow-outline");

export const controllable = cx("appearance-none", focusable);

export const bordered = cx("border-2");
export const rounded = "rounded-lg";

export const labeled = cx(
    "block",
    "font-semibold",
    "leading-6",
    "text-gray-700",
    "tracking-wide",
);

export const inputable = cx(
    "focus:border-blue-400",
    "h-12",
    "px-4",
    "text-gray-900",
    "w-full",
    bordered,
    controllable,
    focusable,
    rounded,
);
