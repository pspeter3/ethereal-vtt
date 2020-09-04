import { Vector } from "./geometry";

const DataURLPattern = /^data:(.+);base64,(.+)$/;

/**
 * Converts a Data URL to a Blob.
 * @param url Data URL to convert
 */
export function fromDataURL(url: string): Blob {
    const match = url.match(DataURLPattern);
    if (!match) {
        throw new Error("Invalid Data URL");
    }
    const type = match[1];
    const data = atob(match[2]);
    const n = data.length;
    const bytes = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
        bytes[i] = data.charCodeAt(i);
    }
    return new Blob([bytes], { type });
}

/**
 * Convert Blob to Data URL
 * @param blob Blob to convert
 */
export async function toDataURL(blob: Blob): Promise<string> {
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
 * Converts a Blob to an ArrayBuffer.
 * @param blob Blob to convert
 */
export async function toArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => resolve(reader.result as ArrayBuffer),
            { once: true },
        );
        reader.addEventListener("error", reject, { once: true });
        reader.readAsArrayBuffer(blob);
    });
}

/**
 * Converts an ArrayBuffer to a digest.
 * @param buffer ArrayBuffer to conver
 */
export async function toDigest(buffer: ArrayBuffer): Promise<string> {
    const hash = await crypto.subtle.digest("SHA-1", buffer);
    return Array.from(new Uint8Array(hash))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

/**
 * Converts a Blob to a Vector of its dimensions.
 * @param blob Blob to convert
 */
export async function toVector(blob: Blob): Promise<Vector> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const url = URL.createObjectURL(blob);
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
