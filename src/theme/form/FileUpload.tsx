import { h, FunctionComponent } from "preact";
import { cx } from "../cx";
import { FilePlus } from "preact-feather";
import { focusStyle } from "../styles";

export const FileUpload: FunctionComponent = () => (
    <div className={cx("h-48", "flex", "flex-col", "space-y-2")}>
        <label
            htmlFor="file"
            className={cx(
                "border-2",
                "border-indigo-500",
                "flex-grow",
                "flex",
                "items-center",
                "justify-center",
                "rounded",
                "text-indigo-500",
            )}
        >
            <FilePlus />
        </label>
        <input
            type="file"
            name="file"
            id="file"
            className={cx(focusStyle, "rounded")}
        />
    </div>
);

FileUpload.displayName = "FileUpload";
