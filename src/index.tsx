import "tailwindcss/tailwind.css";
import { h, render } from "preact";

export const NAME = "Ethereal VTT";

window.addEventListener("load", () => {
    render(<h1>{NAME}</h1>, document.body);
}, {once: true});