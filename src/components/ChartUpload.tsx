import { FunctionComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import * as uuid from "uuid";
import { Chart } from "../store/schema";
import { cx } from "../theme/cx";
import { FileUpload } from "../theme/form/FileUpload";
import { FormControl } from "../theme/form/FormControl";
import { FormLabel } from "../theme/form/FormLabel";
import { NumberField } from "../theme/form/NumberField";
import { TextField } from "../theme/form/TextField";
import {
    bordered,
    controllable,
    focusable,
    labeled,
    rounded,
} from "../theme/styles";
import { Asset, fromFile } from "../util/asset";
import { Position } from "../util/geometry";

interface Result {
    readonly asset: Asset;
    readonly chart: Chart;
}

export const ChartUpload: FunctionComponent = () => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [size, setSize] = useState<Position>([0, 0]);
    const [scale, setScale] = useState(70);
    const [offset, setOffset] = useState<Position>([0, 0]);
    const [ratio, setRatio] = useState(5);
    const [dimension, setDimension] = useState("'");
    const [result, setResult] = useState<Result | Error | null>(null);
    useEffect(() => {
        if (file && file.name) {
            setName((name) => (name === "" ? file.name : name));
            console.log(nameRef.current);
            nameRef.current?.focus();
        }
    }, [file]);
    return (
        <form
            className={cx("space-y-6")}
            onSubmit={async (event) => {
                event.preventDefault();
                if (file) {
                    try {
                        const asset = await fromFile(file);
                        const now = Date.now();
                        setResult({
                            asset,
                            chart: {
                                id: uuid.v4(),
                                createdAt: now,
                                updatedAt: now,
                                name,
                                size,
                                assetId: asset.hash,
                                scale,
                                offset,
                                ratio,
                                dimension,
                            },
                        });
                    } catch (err) {
                        setResult(err);
                    }
                }
            }}
        >
            <FileUpload
                id="file"
                accept=".jpg, .jpeg, .png"
                onChange={setFile}
                required={true}
            >
                File
            </FileUpload>
            <FormControl>
                <FormLabel id="name">Name</FormLabel>
                <TextField
                    id="name"
                    value={name}
                    onChange={setName}
                    required
                    fieldRef={nameRef}
                />
            </FormControl>
            <FormControl>
                <FormLabel id="scale">Scale</FormLabel>
                <p className={cx("text-gray-600", "leading-6")}>
                    The number of pixels per square.
                </p>
                <NumberField
                    id="scale"
                    value={scale}
                    onChange={setScale}
                    required={true}
                />
            </FormControl>
            <fieldset>
                <legend className={cx(labeled, "border-b", "w-full")}>
                    Dimensions
                </legend>
                <p className={cx("text-gray-600", "leading-6", "my-3")}>
                    The number of columns and rows in the grid.
                </p>
                <div className={cx("flex", "space-x-4")}>
                    <FormControl>
                        <FormLabel id="cols">Columns</FormLabel>
                        <NumberField
                            id="cols"
                            value={size[0]}
                            onChange={(x) => setSize(([_, y]) => [x, y])}
                            required={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel id="rows">Rows</FormLabel>
                        <NumberField
                            id="rows"
                            value={size[1]}
                            onChange={(y) => setSize(([x]) => [x, y])}
                            required={true}
                        />
                    </FormControl>
                </div>
            </fieldset>
            <fieldset>
                <legend className={cx(labeled, "border-b", "w-full")}>
                    Offset
                </legend>
                <p className={cx("text-gray-600", "leading-6", "my-3")}>
                    The number of pixels that offset the grid.
                </p>
                <div className={cx("flex", "space-x-4")}>
                    <FormControl>
                        <FormLabel id="offset-x">X</FormLabel>
                        <NumberField
                            id="offset-x"
                            value={offset[0]}
                            onChange={(x) => setOffset(([_, y]) => [x, y])}
                            required={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel id="offset-y">Y</FormLabel>
                        <NumberField
                            id="offset-y"
                            value={offset[1]}
                            onChange={(y) => setOffset(([x]) => [x, y])}
                            required={true}
                        />
                    </FormControl>
                </div>
            </fieldset>
            <fieldset>
                <legend className={cx(labeled, "border-b", "w-full")}>
                    Game Scale
                </legend>
                <p className={cx("text-gray-600", "leading-6", "my-3")}>
                    The ratio of game scale to grid scale and the dimension
                    notation.
                </p>
                <div className={cx("flex", "space-x-4")}>
                    <FormControl>
                        <FormLabel id="ratio">Ratio</FormLabel>
                        <NumberField
                            id="ratio"
                            value={ratio}
                            onChange={setRatio}
                            required={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel id="dimension">Dimension</FormLabel>
                        <TextField
                            id="dimension"
                            value={dimension}
                            onChange={setDimension}
                            required={true}
                        />
                    </FormControl>
                </div>
            </fieldset>
            <button
                type="submit"
                className={cx(
                    "flex",
                    "focus:bg-blue-100",
                    "focus:border-blue-400",
                    "focus:text-blue-700",
                    "font-bold",
                    "h-12",
                    "hover:bg-gray-100",
                    "items-center",
                    "justify-center",
                    "px-4",
                    "text-gray-700",
                    "w-full",
                    bordered,
                    controllable,
                    focusable,
                    rounded,
                )}
            >
                Submit
            </button>
            <pre
                className={cx(
                    rounded,
                    bordered,
                    "bg-gray-100",
                    "text-gray-700",
                    "leading-6",
                    "overflow-auto",
                    "px-4",
                    "py-3",
                )}
            >
                {JSON.stringify(result, null, 2)}
            </pre>
        </form>
    );
};

ChartUpload.displayName = "ChartUpload";
