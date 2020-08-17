import { h, FunctionComponent } from "preact";
import { classnames } from "tailwindcss-classnames";
import { focusStyle } from "../styles";

export const Submit: FunctionComponent = () => (
    <input
        type="submit"
        className={classnames(
            "bg-indigo-600",
            "font-bold",
            "h-12",
            "hover:bg-indigo-700",
            "rounded",
            "text-indigo-100",
            "w-full",
            focusStyle
        )}
    />
);
