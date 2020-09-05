import { h, FunctionComponent } from "preact";
import { cx } from "../cx";

export const Control: FunctionComponent = ({ children }) => (
    <div className={cx("w-full")}>{children}</div>
);

Control.displayName = "Control";
