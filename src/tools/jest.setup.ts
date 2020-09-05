import * as crypto from "crypto";
import "@testing-library/jest-dom";
import "fake-indexeddb/auto";

// Polyfill crypto
if (!window.crypto) {
    (window as { crypto: unknown }).crypto = {
        subtle: {
            digest(algorithm: string, data: ArrayBuffer): ArrayBuffer {
                const hash = crypto.createHash(
                    algorithm.replace("-", "").toLowerCase(),
                );
                hash.update(Buffer.from(data));
                return hash.digest();
            },
        },
    };
}

if (!URL.createObjectURL) {
    URL.createObjectURL = jest.fn();
}

if (!URL.revokeObjectURL) {
    URL.revokeObjectURL = jest.fn();
}
