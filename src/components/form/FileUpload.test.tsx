import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { FileUpload } from "./FileUpload";
import { AssetType } from "../../util/asset";

describe("FileUpload", () => {
    it("should handle file inputs", () => {
        const onChange = jest.fn();
        render(
            <FileUpload
                id="file"
                accept=".jpg, .jpeg, .png"
                file={null}
                onChange={onChange}
                required={true}
            >
                File
            </FileUpload>,
        );
        const file = new File([""], "test.png", {
            type: AssetType.PNG,
        });
        fireEvent.change(screen.getByLabelText("File"), {
            target: {
                files: [file],
            },
        });
        expect(onChange).toHaveBeenCalledWith(file);
    });

    it("should handle empty file lists", () => {
        const onChange = jest.fn();
        render(
            <FileUpload
                id="file"
                accept=".jpg, .jpeg, .png"
                file={null}
                onChange={onChange}
                required={true}
            >
                File
            </FileUpload>,
        );
        fireEvent.change(screen.getByLabelText("File"), {
            target: {
                files: [],
            },
        });
        expect(onChange).not.toHaveBeenCalled();
    });

    it("should handle file drops", () => {
        const onChange = jest.fn();
        render(
            <FileUpload
                id="file"
                accept=".jpg, .jpeg, .png"
                file={null}
                onChange={onChange}
                required={true}
            >
                File
            </FileUpload>,
        );
        const file = new File([""], "test.png", {
            type: AssetType.PNG,
        });
        const label = screen.getByText("File");
        fireEvent.dragOver(label);
        fireEvent.drop(label, {
            dataTransfer: {
                files: [file],
            },
        });
        expect(onChange).toHaveBeenCalledWith(file);
    });

    it("should handle missing data transfer", () => {
        const onChange = jest.fn();
        render(
            <FileUpload
                id="file"
                accept=".jpg, .jpeg, .png"
                file={null}
                onChange={onChange}
                required={true}
            >
                File
            </FileUpload>,
        );
        const label = screen.getByText("File");
        fireEvent.dragOver(label);
        fireEvent.drop(label);
        expect(onChange).not.toHaveBeenCalled();
    });

    it("should display file name", () => {
        const file = new File([""], "test.png", {
            type: AssetType.PNG,
        });
        render(
            <FileUpload
                id="file"
                accept=".jpg, .jpeg, .png"
                file={file}
                onChange={jest.fn()}
                required={true}
            >
                File
            </FileUpload>,
        );
        expect(screen.queryByText(file.name)).not.toBeNull();
    });
});
