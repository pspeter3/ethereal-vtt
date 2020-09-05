import { DBSchema } from "idb";
import { Asset } from "../util/asset";
import { Position } from "../util/geometry";

/**
 * Entity is the base interface for objects stored in IndexedDB.
 */
export interface Entity {
    /**
     * Id is the uuid for the Entity.
     */
    readonly id: string;
    /**
     * CreatedAt is the timestamp for when the entity was created.
     */
    readonly createdAt: number;
    /**
     * UpdatedAt is the timestamp for when the entity was updated.
     * Defaults to createdAt at creation.
     */
    readonly updatedAt: number;
}

/**
 * Picture is the base interface for entities associated with assets.
 */
export interface Picture extends Entity {
    /**
     * Name is the name of the picture.
     */
    readonly name: string;
    /**
     * Size is the dimensions in grid space.
     */
    readonly size: Position;
    /**
     * AssetId is the hash of the asset.
     */
    readonly assetId: string;
}

/**
 * Chart is the entity for battle maps.
 */
export interface Chart extends Picture {
    /**
     * Scale is the pixel to grid ratio.
     * Defaults to 70px due to Roll20 legacy.
     */
    readonly scale: number;
    /**
     * Offset is the pixel offset.
     * Defaults to [0, 0]
     */
    readonly offset: Position;
    /**
     * Ratio is the grid to dimension ratio.
     * Defautls to 5 due to D&D legacy.
     */
    readonly ratio: number;
    /**
     * Dimesion is the game space measuremnt.
     * Defaults to ' due to feet.
     */
    readonly dimension: string;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * Token is the entity for battle map tokens.
 */
export interface Token extends Picture {}

/**
 * Encounter is the entity representing a battle map session.
 */
export interface Encounter extends Entity {}
/* eslint-enable @typescript-eslint/no-empty-interface */

export interface Schema extends DBSchema {
    config: {
        value: string;
        key: string;
    };
    assets: {
        value: Asset;
        key: string;
    };
    charts: {
        value: Chart;
        key: string;
        indexes: { byName: string };
    };
    tokens: {
        value: Token;
        key: string;
        indexes: { byName: string };
    };
    encounters: {
        value: Encounter;
        key: string;
        indexes: { byUpdatedAt: number };
    };
}
