import { h, FunctionComponent } from "preact";
import { inputable } from "../styles";

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
        className={inputable}
    />
);

TextField.displayName = "TextField";
