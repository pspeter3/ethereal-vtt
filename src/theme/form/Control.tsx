import { h, FunctionComponent } from "preact";
import { classnames } from "tailwindcss-classnames";

export const Control: FunctionComponent = ({ children }) => (
    <div className={classnames("w-full")}>{children}</div>
);

Control.displayName = "Control";
