import { FunctionComponent, h } from "preact";
import { Position } from "../../util/geometry";
import { FieldGroup } from "./FieldGroup";
import { NumberControl } from "./NumberControl";

export const PositionControl: FunctionComponent<{
    label: string;
    help: string;
    labels: [string, string];
    value: Position;
    onChange: (value: Position) => void;
}> = ({ label, help, labels, value, onChange }) => {
    const [alpha, omega] = labels;
    const [a, o] = value;
    return (
        <FieldGroup label={label} help={help}>
            <NumberControl
                label={alpha}
                value={a}
                onChange={(a) => onChange([a, o])}
            />
            <NumberControl
                label={omega}
                value={o}
                onChange={(o) => onChange([a, o])}
            />
        </FieldGroup>
    );
};

PositionControl.displayName = "PositionControl";
