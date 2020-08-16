import { distance } from "./geometry";

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
});
