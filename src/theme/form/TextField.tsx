import { h, FunctionComponent } from "preact";
import { fieldStyle } from "../styles";

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
        className={fieldStyle}
    />
);

TextField.displayName = "TextField";
