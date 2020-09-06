import { FunctionComponent, h } from "preact";
import { cx } from "../cx";

export const Toolbar: FunctionComponent = ({ children }) => (
    <nav className={cx("fixed", "top-0", "left-0", "p-2", "space-y-2")}>
        {children}
    </nav>
);

Toolbar.displayName = "Toolbar";
