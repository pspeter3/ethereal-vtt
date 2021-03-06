/**
 * Construct a class name from arguments.
 * @param args A parameter list of strings, objects, nulls, or undefineds.
 */
export function cx(
    ...args: Array<string | Record<string, boolean> | null | undefined>
): string {
    const cx: string[] = [];
    for (const arg of args) {
        if (!arg) {
            continue;
        }
        if (typeof arg === "string") {
            cx.push(arg);
            continue;
        }
        const keys = Object.keys(arg);
        for (const key of keys) {
            if (arg[key]) {
                cx.push(key);
            }
        }
    }
    return cx.join(" ");
}
