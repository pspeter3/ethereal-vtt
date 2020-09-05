import { Fragment, FunctionComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { useError } from "./hooks/useError";

export const App: FunctionComponent = ({ children }) => {
    const error = useError();
    useEffect(() => console.error(error), [error]);
    return <Fragment>{children}</Fragment>;
};
