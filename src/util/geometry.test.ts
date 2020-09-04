import { distance, euclidean, measure } from "./geometry";

describe("geometry", () => {
    describe("distance", () => {
        it("should handle axises", () => {
            expect(distance([0, 0], [6, 0])).toEqual(6);
            expect(distance([0, 0], [0, 6])).toEqual(6);
        });

        it("should handle negatives", () => {
            expect(distance([0, 0], [-6, 0])).toEqual(6);
            expect(distance([0, 0], [0, -6])).toEqual(6);
        });

        it("should handle diagonals", () => {
            expect(distance([0, 0], [4, 4])).toEqual(6);
        });
    });

    describe("euclidian", () => {
        it("should handle distance", () => {
            expect(euclidean([0, 0], [3, 4])).toEqual(5);
        });
    });

    describe("measure", () => {
        it("should measure a path", () => {
            expect(
                measure([
                    [0, 0],
                    [6, 0],
                    [10, 4],
                ]),
            ).toEqual(12);
        });

        it("should handle an empty array", () => {
            expect(measure([])).toEqual(0);
        });

        it("should handle an array of a single position", () => {
            expect(measure([[0, 0]])).toEqual(0);
        });
    });
});
