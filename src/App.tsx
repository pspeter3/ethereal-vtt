import { FunctionComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { useError } from "./hooks/useError";
import ConnectionScreen from "./screens/ConnectionScreen";

export const App: FunctionComponent<{ host: string | null }> = ({ host }) => {
    const error = useError();
    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);
    return (
        <ConnectionScreen
            isHost={host === null}
            onSubmit={(value) => console.log(value)}
        />
    );
};
