import { h, FunctionComponent, Ref } from "preact";
import { inputable } from "../styles";

export const TextField: FunctionComponent<{
    id: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    fieldRef?: Ref<HTMLInputElement>;
}> = ({ id, value, onChange, required, fieldRef }) => {
    return (
        <input
            type="text"
            name={id}
            id={id}
            value={value}
            onChange={(event) =>
                onChange((event.target as HTMLInputElement).value)
            }
            required={required}
            className={inputable}
            ref={fieldRef}
        />
    );
};

TextField.displayName = "TextField";
