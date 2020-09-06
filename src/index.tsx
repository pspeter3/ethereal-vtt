import "tailwindcss/tailwind.css";
import { h, render } from "preact";
import { App } from "./App";

window.addEventListener(
    "load",
    () => {
        render(
            <App
                host={new URLSearchParams(window.location.search).get("host")}
            />,
            document.body,
        );
    },
    { once: true },
);
