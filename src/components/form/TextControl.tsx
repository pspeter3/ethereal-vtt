import { FunctionComponent, h, Ref } from "preact";
import { FormControl } from "./FormControl";
import { FormLabel } from "./FormLabel";
import { HelpText } from "./HelpText";
import { TextField } from "./TextField";

export const TextControl: FunctionComponent<{
    label: string;
    help?: string;
    value: string;
    onChange: (value: string) => void;
    fieldRef?: Ref<HTMLInputElement>;
}> = ({ label, help, value, onChange, fieldRef }) => {
    const id = label.toLowerCase().replace(/\s+/, "-");
    return (
        <FormControl>
            <FormLabel id={id}>{label}</FormLabel>
            {help ? <HelpText>{help}</HelpText> : null}
            <TextField
                id={id}
                value={value}
                onChange={onChange}
                fieldRef={fieldRef}
                required={true}
            />
        </FormControl>
    );
};

TextControl.displayName = "TextControl";
