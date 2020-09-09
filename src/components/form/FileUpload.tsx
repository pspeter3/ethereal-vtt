import { h, FunctionComponent, Fragment } from "preact";
import { cx } from "../../util/cx";
import { File, FilePlus } from "preact-feather";
import { bordered, labeled, rounded } from "../styles";

export const FileUpload: FunctionComponent<{
    id: string;
    accept: string;
    file: File | null;
    onChange: (value: File) => void;
    required?: boolean;
}> = ({ id, accept, file, onChange, required, children }) => {
    const onFiles = (files: FileList | null) => {
        if (files && files.length > 0) {
            onChange(files[0]);
        }
    };
    return (
        <label
            htmlFor={id}
            className={cx("block", "focus-within:shadow-outline", rounded)}
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
            <span className={cx(labeled)}>{children}</span>
            <span
                className={cx(
                    "flex-grow",
                    "flex",
                    "h-24",
                    "hover:bg-gray-100",
                    "items-center",
                    "justify-center",
                    "px-4",
                    "space-x-2",
                    "text-gray-500",
                    bordered,
                    rounded,
                )}
            >
                {file !== null ? (
                    <Fragment>
                        <span className={cx("block")}>
                            <File />
                        </span>
                        <span
                            className={cx("block", "text-gray-700", "truncate")}
                        >
                            {file.name}
                        </span>
                    </Fragment>
                ) : (
                    <FilePlus />
                )}
            </span>
            <input
                type="file"
                name={id}
                id={id}
                className={cx("sr-only")}
                required={required}
                accept={accept}
                onChange={(event) =>
                    onFiles((event.target as HTMLInputElement).files)
                }
            />
        </label>
    );
};

FileUpload.displayName = "FileUpload";
