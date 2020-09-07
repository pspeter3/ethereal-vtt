import { cx } from "./cx";

describe("cx", () => {
    it("should handle undefined", () => {
        const classname = "test";
        expect(cx(classname, undefined)).toEqual(classname);
    });

    it("should handle null", () => {
        const classname = "test";
        expect(cx(classname, null)).toEqual(classname);
    });

    it("should handle multiple", () => {
        expect(cx("foo", "bar")).toEqual("foo bar");
    });

    it("should handle objects", () => {
        expect(
            cx("foo", {
                bar: true,
                baz: false,
            }),
        ).toEqual("foo bar");
    });
});
