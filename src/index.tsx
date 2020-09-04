import "tailwindcss/tailwind.css";
import { h, render } from "preact";
import { classnames } from "tailwindcss-classnames";
import { Shield } from "preact-feather";

export const NAME = "Ethereal VTT";

window.addEventListener(
    "load",
    () => {
        render(
            <hgroup
                className={classnames(
                    "flex",
                    "px-4",
                    "py-3",
                    "space-x-2",
                    "items-center",
                )}
            >
                <Shield className={classnames("text-gray-700")} />
                <h1
                    className={classnames(
                        "antialiased",
                        "font-medium",
                        "leading-6",
                        "text-gray-700",
                        "text-2xl",
                    )}
                >
                    {NAME}
                </h1>
            </hgroup>,
            document.body,
        );
    },
    { once: true },
);
