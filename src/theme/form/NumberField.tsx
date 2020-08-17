import { h, FunctionComponent } from "preact";
import { classnames } from "tailwindcss-classnames";

export const NumberField: FunctionComponent<{
    id: string;
    value: number;
    onChange: (value: number) => void;
    required?: boolean;
}> = ({ id, value, onChange, required }) => (
    <input
        type="number"
        name={id}
        id={id}
        value={value}
        onChange={(event) =>
            onChange(parseFloat((event.target as HTMLInputElement).value))
        }
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
