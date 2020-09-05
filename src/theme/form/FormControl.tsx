import { h, FunctionComponent } from "preact";
import { cx } from "../cx";

export const FormControl: FunctionComponent = ({ children }) => (
    <div className={cx("w-full")}>{children}</div>
);

FormControl.displayName = "FormControl";
