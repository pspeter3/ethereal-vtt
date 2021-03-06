import { FunctionComponent, h } from "preact";
import { cx } from "../../util/cx";

export const HelpText: FunctionComponent = ({ children }) => (
    <p className={cx("text-gray-600", "leading-6")}>{children}</p>
);

HelpText.displayName = "HelpText";
