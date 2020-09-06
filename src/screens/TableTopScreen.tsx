import { FunctionComponent, h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useVirtualTableTop } from "../hooks/useVirtualTableTop";

const TableTopScreen: FunctionComponent<{ host: string | null }> = ({
    host,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useVirtualTableTop(ref);
    useEffect(console.log, [host]);
    return <div ref={ref}></div>;
};

TableTopScreen.displayName = "TableTopScreen";

export default TableTopScreen;
