import { Fragment, FunctionComponent, h } from "preact";
import {
    ArrowRight,
    Circle,
    Crosshair,
    GitCommit,
    Grid,
    MapPin,
    Settings,
    Square,
    Triangle,
    X,
    Zap,
} from "preact-feather";
import { useEffect, useRef, useState } from "preact/hooks";
import { useVirtualTableTop } from "../hooks/useVirtualTableTop";
import { cx } from "../util/cx";
import { Toolbar } from "../theme/toolbar/Toolbar";
import { ToolbarButton } from "../theme/toolbar/ToolbarButton";

const TableTopScreen: FunctionComponent<{ host: string | null }> = ({
    host,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [area, setArea] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    useVirtualTableTop(ref);
    useEffect(console.log, [host]);
    return (
        <Fragment>
            <Toolbar>
                <ToolbarButton
                    label={expanded ? "Close toolbar." : "Open toolbar."}
                    icon={expanded ? X : Grid}
                    expanded={expanded}
                    onClick={() => setExpanded((expanded) => !expanded)}
                />
                {expanded ? (
                    <ul className={cx("space-y-2")}>
                        <li>
                            <ToolbarButton
                                label="Add pin to map."
                                icon={MapPin}
                            />
                        </li>
                        <li>
                            <ToolbarButton
                                label="Add path to map."
                                icon={GitCommit}
                            />
                        </li>
                        <li>
                            <ToolbarButton
                                label="Target grid on map."
                                icon={Crosshair}
                            />
                        </li>
                        <li className={cx("flex", "space-x-2")}>
                            <ToolbarButton
                                label="Open area of effect tooblar."
                                icon={Zap}
                                expanded={area}
                                onClick={() => setArea((area) => !area)}
                            />
                            {area ? (
                                <ul className={cx("flex", "space-x-2")}>
                                    <li>
                                        <ToolbarButton
                                            label="Add line to map."
                                            icon={ArrowRight}
                                        />
                                    </li>
                                    <li>
                                        <ToolbarButton
                                            label="Add square to map."
                                            icon={Square}
                                        />
                                    </li>
                                    <li>
                                        <ToolbarButton
                                            label="Add triangle to map."
                                            icon={Triangle}
                                        />
                                    </li>
                                    <li>
                                        <ToolbarButton
                                            label="Add circle to map."
                                            icon={Circle}
                                        />
                                    </li>
                                </ul>
                            ) : null}
                        </li>
                        <li>
                            <ToolbarButton
                                label="Open settings dialog."
                                icon={Settings}
                            />
                        </li>
                    </ul>
                ) : null}
            </Toolbar>
            <div ref={ref} />
        </Fragment>
    );
};

TableTopScreen.displayName = "TableTopScreen";

export default TableTopScreen;
