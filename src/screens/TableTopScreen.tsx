import { FunctionComponent, h } from "preact";
import { LoadingIndicator } from '../theme/LoadingIndicator';

const TableTopScreen: FunctionComponent<{ host: string | null }> = ({
    host,
}) => {
    return host ? <h1>{host}</h1> : <LoadingIndicator/>;
};

TableTopScreen.displayName = "TableTopScreen";

export default TableTopScreen;
