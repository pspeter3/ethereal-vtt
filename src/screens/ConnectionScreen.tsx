import { FunctionComponent, h } from "preact";
import { Shield } from "preact-feather";
import { useState } from "preact/hooks";
import { cx } from "../theme/cx";
import { FormContainer } from "../theme/form/FormContainer";
import { SubmitButton } from "../theme/form/SubmitButton";
import { TextControl } from "../theme/form/TextControl";
import { rounded } from "../theme/styles";

const ConnectionScreen: FunctionComponent<{
    isHost: boolean;
    onSubmit: (value: { name: string }) => void;
}> = ({ isHost, onSubmit }) => {
    const [name, setName] = useState("");
    return (
        <main
            className={cx("max-w-sm", "mx-auto", "px-4", "py-3", "space-y-6")}
        >
            <header
                className={cx(
                    "bg-gray-100",
                    "flex",
                    "items-center",
                    "justify-center",
                    "py-6",
                    "space-x-2",
                    rounded,
                )}
            >
                <div className={cx("block", "text-gray-700")}>
                    <Shield />
                </div>
                <h1
                    className={cx(
                        "leading-6",
                        "text-2xl",
                        "text-gray-700",
                        "tracking-wide",
                    )}
                >
                    Ethereal VTT
                </h1>
            </header>
            <FormContainer onSubmit={() => onSubmit({ name })}>
                <TextControl label="Name" value={name} onChange={setName} />
                <SubmitButton>{isHost ? "Start" : "Connect"}</SubmitButton>
            </FormContainer>
        </main>
    );
};

ConnectionScreen.displayName = "ConnectionScreen";

export default ConnectionScreen;
