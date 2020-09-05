import { FunctionComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { ChartUpload } from "./components/ChartUpload";
import { useError } from "./hooks/useError";
import { cx } from "./theme/cx";

export const App: FunctionComponent = () => {
    const error = useError();
    useEffect(() => console.error(error), [error]);
    return (
        <main className={cx("max-w-lg", "mx-auto", "px-4", "py-3")}>
            <ChartUpload />
        </main>
    );
};
