import { FunctionComponent, h } from "preact";
import { cx } from "../../util/cx";
import { labeled } from "../styles";
import { HelpText } from "./HelpText";

export const FieldGroup: FunctionComponent<{ label: string; help: string }> = ({
    label,
    help,
    children,
}) => (
    <fieldset className={cx("space-y-3")}>
        <legend className={cx("border-b", "w-full", labeled)}>{label}</legend>
        <HelpText>{help}</HelpText>
        <div className={cx("flex", "space-x-4")}>{children}</div>
    </fieldset>
);

FieldGroup.displayName = "FieldGroup";
