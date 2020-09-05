import { openDatabase } from "./store";

describe("store", () => {
    describe("openDatabase", () => {
        it("should open the database", async () => {
            const db = await openDatabase();
            expect(db.objectStoreNames).toEqual([
                "assets",
                "charts",
                "config",
                "encounters",
                "tokens",
            ]);
        });
    });
});
