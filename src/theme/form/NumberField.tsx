import { h, FunctionComponent } from "preact";
import { inputable } from "../styles";

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
        className={inputable}
    />
);

NumberField.displayName = "TextField";
