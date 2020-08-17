import { h, FunctionComponent } from "preact";
import { classnames } from "tailwindcss-classnames";

export const TextField: FunctionComponent<{
    id: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}> = ({ id, value, onChange, required }) => (
    <input
        type="text"
        name={id}
        id={id}
        value={value}
        onChange={(event) => onChange((event.target as HTMLInputElement).value)}
        required={required}
        className={classnames(
            "appearance-none",
            "border-2",
            "focus:border-indigo-500",
            "focus:outline-none",
            "focus:shadow-outline",
            "h-12",
            "px-4",
            "rounded",
            "text-gray-900",
            "w-full"
        )}
    />
);

TextField.displayName = "TextField";
