import { h, FunctionComponent, Ref } from "preact";
import { inputable } from "../styles";

export const NumberField: FunctionComponent<{
    id: string;
    value: number;
    onChange: (value: number) => void;
    required?: boolean;
    fieldRef?: Ref<HTMLInputElement>;
}> = ({ id, value, onChange, required, fieldRef }) => (
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
        ref={fieldRef}
    />
);

NumberField.displayName = "TextField";
