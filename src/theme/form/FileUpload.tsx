import { h, FunctionComponent } from "preact";
import { cx } from "../cx";
import { FilePlus } from "preact-feather";
import { bordered, focusable, rounded } from "../styles";

export const FileUpload: FunctionComponent<{
    id: string;
    accept: string;
    onChange: (value: File) => void;
    required?: boolean;
}> = ({ id, accept, onChange, required }) => {
    const onFiles = (files: FileList | null) => {
        if (files && files.length > 0) {
            onChange(files[0]);
        }
    };
    return (
        <div className={cx("h-48", "flex", "flex-col", "space-y-2")}>
            <label
                htmlFor={id}
                className={cx(
                    "flex-grow",
                    "flex",
                    "items-center",
                    "justify-center",
                    "text-gray-300",
                    bordered,
                    rounded,
                )}
                onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    /* istanbul ignore next */
                    if (event.dataTransfer) {
                        event.dataTransfer.dropEffect = "copy";
                    }
                }}
                onDrop={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    if (event.dataTransfer) {
                        onFiles(event.dataTransfer.files);
                    }
                }}
            >
                <FilePlus />
                <span className={cx("sr-only")}>File Upload</span>
            </label>
            <input
                type="file"
                name={id}
                id={id}
                className={cx(focusable, rounded)}
                required={required}
                accept={accept}
                onChange={(event) =>
                    onFiles((event.target as HTMLInputElement).files)
                }
            />
        </div>
    );
};

FileUpload.displayName = "FileUpload";
