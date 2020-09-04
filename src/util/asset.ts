import { Position } from "./geometry";

/**
 * AssetType represents the set of valid image types.
 */
export enum AssetType {
    JPEG = "image/jpeg",
    PNG = "image/png",
}

/**
 * Asset represents an image.
 */
export interface Asset {
    /**
     * Hash is the unique ID of the image based on its contents.
     */
    readonly hash: string;
    /**
     * Type is the asset type of the image.
     */
    readonly type: AssetType;
    /**
     * Size is the dimensions of the image in pixels.
     */
    readonly size: Position;
    /**
     * Data is the image data as an ArrayBuffer.
     */
    readonly data: ArrayBuffer;
}

/**
 * Converts a DataURL to an Asset.
 * @param dataURL The DataURL to convert.
 */
export async function fromDataURL(dataURL: string): Promise<Asset> {
    const [type, data] = parseDataURL(dataURL);
    return await toAsset(type, data);
}

/**
 * Converts a File to an Asset.
 * @param file The File to convert.
 */
export async function fromFile(file: File): Promise<Asset> {
    const type = toAssetType(file.type);
    const data = await read(file);
    return await toAsset(type, data);
}

/* eslint-disable no-undef */
/**
 * Evaluates if a string is an AssetType.
 * @param type The string to evaluate.
 */
export function isAssetType(type: string): type is AssetType {
    return type === AssetType.JPEG || type === AssetType.PNG;
}
/* eslint-enable no-undef */

/**
 * Converts an Asset to a Blob.
 * @param asset The Asset to convert.
 */
export function toBlob({ type, data }: Asset): Blob {
    return new Blob([data], { type });
}

/**
 * Converts an Asset to a DataURL.
 * @param asset The Asset to convert.
 */
export async function toDataURL(asset: Asset): Promise<string> {
    const blob = toBlob(asset);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => resolve(reader.result as string),
            { once: true },
        );
        reader.addEventListener("error", reject, { once: true });
        reader.readAsDataURL(blob);
    });
}

/**
 * Digests an ArrayBuffer.
 * @param buffer The ArrayBuffer to digest.
 */
async function digest(buffer: ArrayBuffer): Promise<string> {
    const hash = await crypto.subtle.digest("SHA-1", buffer);
    return Array.from(new Uint8Array(hash))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

/**
 * Parses a DataURL for its AssetType and ArrayBuffer.
 * @param dataURL The DataURL to parse.
 */
function parseDataURL(
    dataURL: string,
): readonly [type: AssetType, data: ArrayBuffer] {
    const match = dataURL.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid DataURL");
    }
    const type = toAssetType(match[1]);
    const data = atob(match[2]);
    const n = data.length;
    const bytes = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
        bytes[i] = data.charCodeAt(i);
    }
    return [type, bytes.buffer];
}

/**
 * Read a File as an  ArrayBuffer.
 * @param file The File to read.
 */
async function read(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => resolve(reader.result as ArrayBuffer),
            { once: true },
        );
        reader.addEventListener("error", reject, { once: true });
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Determine the size of an image.
 * @param type The AssetType of the image.
 * @param data The ArrayBuffer of the image.
 */
async function sizeOf(type: AssetType, data: ArrayBuffer): Promise<Position> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const url = URL.createObjectURL(new Blob([data], { type }));
        image.addEventListener(
            "load",
            () => resolve([image.width, image.height]),
            { once: true },
        );
        image.addEventListener("error", reject, { once: true });
        image.addEventListener("loadend", () => URL.revokeObjectURL(url));
        image.src = URL.createObjectURL(url);
    });
}

/**
 * Converts an AssetType and ArrayBuffer to an Asset.
 * @param type The AssetType of the Asset.
 * @param data The ArrayBuffer of the Asset.
 */
async function toAsset(type: AssetType, data: ArrayBuffer): Promise<Asset> {
    const [hash, size] = await Promise.all([digest(data), sizeOf(type, data)]);
    return { hash, type, size, data };
}
/**
 * Converts a string to an AssetType.
 * Throws if the string is not a valid AssetType.
 * @param type The type to evaluate.
 */
function toAssetType(type: string): AssetType | never {
    if (!isAssetType(type)) {
        throw new Error(`Invalid AssetType ${type}`);
    }
    return type;
}
