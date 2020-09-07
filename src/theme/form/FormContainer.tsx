import { FunctionComponent, h } from "preact";
import { cx } from "../../util/cx";

export const FormContainer: FunctionComponent<{ onSubmit: () => void }> = ({
    onSubmit,
    children,
}) => (
    <form
        className={cx("space-y-6")}
        onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
        }}
    >
        {children}
    </form>
);

FormContainer.displayName = "FormContainer";
