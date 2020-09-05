import { IDBPDatabase, openDB } from "idb";
import { Schema } from "./schema";

export type Database = IDBPDatabase<Schema>;
/**
 * Opens the IndexedDB instance.
 * @param name The name of the IndexedDB database.
 */
export async function openDatabase(): Promise<Database> {
    return await openDB<Schema>("ethereal-vtt", 1, {
        upgrade(db) {
            db.createObjectStore("config");
            db.createObjectStore("assets", {
                keyPath: "hash",
            });
            const chartsStore = db.createObjectStore("charts", {
                keyPath: "id",
            });
            chartsStore.createIndex("byName", "name");
            const tokensStore = db.createObjectStore("tokens", {
                keyPath: "id",
            });
            tokensStore.createIndex("byName", "name");
            const encountersStore = db.createObjectStore("encounters", {
                keyPath: "id",
            });
            encountersStore.createIndex("byUpdatedAt", "updatedAt");
        },
    });
}
