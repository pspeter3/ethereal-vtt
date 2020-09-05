import { h, FunctionComponent } from "preact";
import { cx } from "../cx";
import { FilePlus } from "preact-feather";
import { bordered, focusable, rounded } from "../styles";

export const FileUpload: FunctionComponent = () => (
    <div className={cx("h-48", "flex", "flex-col", "space-y-2")}>
        <label
            htmlFor="file"
            className={cx(
                "flex-grow",
                "flex",
                "items-center",
                "justify-center",
                "text-gray-300",
                bordered,
                rounded,
            )}
        >
            <FilePlus />
        </label>
        <input
            type="file"
            name="file"
            id="file"
            className={cx(focusable, rounded)}
        />
    </div>
);

FileUpload.displayName = "FileUpload";
