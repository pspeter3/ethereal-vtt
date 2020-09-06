import { FunctionComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import * as uuid from "uuid";
import { Chart } from "../store/schema";
import { cx } from "../theme/cx";
import { FieldGroup } from "../theme/form/FieldGroup";
import { FileUpload } from "../theme/form/FileUpload";
import { NumberControl } from "../theme/form/NumberControl";
import { PositionControl } from "../theme/form/PositionControl";
import { SubmitButton } from "../theme/form/SubmitButton";
import { TextControl } from "../theme/form/TextControl";
import { bordered, rounded } from "../theme/styles";
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
    const [size, setSize] = useState<Position>([1, 1]);
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
                file={file}
                onChange={setFile}
                required={true}
            >
                File
            </FileUpload>
            <TextControl
                label="Name"
                value={name}
                onChange={setName}
                fieldRef={nameRef}
            />
            <NumberControl
                label="Scale"
                help="The scale of a grid square in pixels."
                value={scale}
                onChange={setScale}
            />
            <PositionControl
                label="Dimensions"
                help="The number of columns and rows in the grid."
                labels={["Columns", "Rows"]}
                value={size}
                onChange={setSize}
            />
            <PositionControl
                label="Offset"
                help="The number of pixels that offset the grid."
                labels={["Columns", "Rows"]}
                value={offset}
                onChange={setOffset}
            />
            <FieldGroup
                label="Game Scale"
                help="The ratio of game scale to grid scale and the game scale
                    notation."
            >
                <NumberControl
                    label="Ratio"
                    value={ratio}
                    onChange={setRatio}
                />
                <TextControl
                    label="Notation"
                    value={dimension}
                    onChange={setDimension}
                />
            </FieldGroup>
            <SubmitButton>Submit</SubmitButton>
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
