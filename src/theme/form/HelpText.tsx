import { FunctionComponent, h } from "preact";
import { cx } from "../cx";

export const HelpText: FunctionComponent = (props) => (
    <p className={cx("text-gray-600", "leading-6")} {...props} />
);

HelpText.displayName = "HelpText";
