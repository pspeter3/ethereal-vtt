import { h, FunctionComponent } from "preact";
import { cx } from "../cx";
import { labeled } from "../styles";

export const FormLabel: FunctionComponent<{ id: string }> = ({
    id,
    children,
}) => (
    <label htmlFor={id} className={cx(labeled)}>
        {children}
    </label>
);

FormLabel.displayName = "FormLabel";
