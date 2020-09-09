import { FunctionComponent, h } from "preact";
import { Shield } from "preact-feather";
import { cx } from "../util/cx";

export const LoadingIndicator: FunctionComponent = () => (
    <div
        className={cx(
            "bg-black",
            "fixed",
            "flex",
            "inset-0",
            "items-center",
            "justify-center",
        )}
    >
        <div
            className={cx(
                "animate-pulse",
                "bg-gray-800",
                "border-8",
                "border-gray-900",
                "flex",
                "h-24",
                "items-center",
                "justify-center",
                "rounded-full",
                "text-gray-400",
                "w-24",
            )}
        >
            <Shield />
        </div>
    </div>
);

LoadingIndicator.displayName = "LoadingIndicator";
