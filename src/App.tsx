import { FunctionComponent, h } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { useError } from "./hooks/useError";
import ConnectionScreen from "./screens/ConnectionScreen";
import { LoadingIndicator } from "./theme/LoadingIndicator";

const TableTopScreen = lazy(() => import("./screens/TableTopScreen"));

export const App: FunctionComponent<{ host: string | null }> = ({ host }) => {
    const error = useError();
    const [config, setConfig] = useState<{ name: string } | null>(null);
    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);
    return config === null ? (
        <ConnectionScreen isHost={host === null} onSubmit={setConfig} />
    ) : (
        <Suspense fallback={<LoadingIndicator />}>
            <TableTopScreen host={host} />
        </Suspense>
    );
};
