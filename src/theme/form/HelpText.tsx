import { FunctionComponent, h } from "preact";
import { cx } from "../cx";

export const HelpText: FunctionComponent = ({ children }) => (
    <p className={cx("text-gray-500", "leading-6")}>{children}</p>
);

HelpText.displayName = "HelpText";
