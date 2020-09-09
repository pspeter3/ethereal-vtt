import { FunctionComponent, h, Ref } from "preact";
import { FormControl } from "./FormControl";
import { FormLabel } from "./FormLabel";
import { HelpText } from "./HelpText";
import { NumberField } from "./NumberField";

export const NumberControl: FunctionComponent<{
    label: string;
    help?: string;
    value: number;
    onChange: (value: number) => void;
    fieldRef?: Ref<HTMLInputElement>;
}> = ({ label, help, value, onChange, fieldRef }) => {
    const id = label.toLowerCase().replace(/\s+/, "-");
    return (
        <FormControl>
            <FormLabel id={id}>{label}</FormLabel>
            {help ? <HelpText>{help}</HelpText> : null}
            <NumberField
                id={id}
                value={value}
                onChange={onChange}
                fieldRef={fieldRef}
                required={true}
            />
        </FormControl>
    );
};

NumberControl.displayName = "NumberControl";
