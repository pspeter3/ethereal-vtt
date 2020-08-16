import {
    fromDataURL,
    toArrayBuffer,
    toDigest,
    toVector,
    toDataURL,
} from "./image";
import * as crypto from "crypto";

describe("image", () => {
    const REF =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFKElEQVRoQ+1ZS2xUVRj+/jMdKhSaiFFDsb1DFcXIAuMbFnbulIXiRpP6pEaDzJ0mxoWCugELbFTQhTHp3EGiEfDVRDZWFzB36qL4QCMLjCha5rZSIkZMKgXLdM5vzm2nacudztzOndZJuMms5n995z+P73yHUOEfVXj9uAwg18FIwm6GZA0kNMncSEQ3ALx89H86wcy/CqJesLQhyE5GtUN+dL+kDjR1nAyRoBYCtQC4w2NBRxjcyZI7u9uWpT36jpvPCEB4d//9xKyKbgFzjRON+QAReliIATmSPR0IBAf+DZw7rf66IrtwSTabqRNVgSUkZR0z1oDowdHm0BCATibqTG2s/9wrEM8AwmZ6C4G2j02Nc2DeB8F7rWjosJfkeiK9GpJaQbQe4IXOGIC3pozQDi9xPAGImPZHDDziJJByG0Rgr2U0/OYl4VRb3ey7HuD1ANqdhgAfJw3t0WJjFg1AN+1jAG4B8yAEPWtFtb3FJinGTk/YrZD8NohqAfxoGdrKYvyKAqCbNo+ODh+dN5y594vnlg8WE9yrzX1vnai9WB38kkGrlK9laAXrK2gQNu2DBDSrKWO1LXPaXO5P7zjZDiFeYeBQytDWTpdvWgC5BUtAV9LQHih34RPjR0z7MwbWFVrYeQHo8b4YiDsAnLkwJEJfPV9/YTYB3PNm//z5NVKdD9eAqc2KNcTd8rsCcPZ5KbtGt2ms9evU9DoA6nRnxkFnixVinds54QpAT/S9C+anZnPe5wOXWw8ges+KNjw91e4SAIoeiEDgmDpVAKwqdZ/3Ouru5wSOgkAym105lXZcAiBspjcT6HUw4lZMayu1AD/89bjdAUKMwS+mjNDOiTEvAaCb9rcOMSNe45Ue+FGsWwyHdjD1ADhiGdqdeQGMLxrmA1Ys9FC5CppJXD2e/lQRwKmbyqQOhON2lAgmiDdb0dCumSQql4+eSG8C005mGKmYlsjlmQRAT9ivgvESCE/6zXVKBeZwJcb7ILxmRbWX3QGY9ieK4zOjORXTkqUm9dM/HLcjRFC3uE7L0B52BxC3vwPhNongzd1G3XE/Cyg1VpM5sEIg8xMY31sx7fZ8HTgL4MrhqgW1PRuu/qfUpH76r9nz56LqkfOKBf9tGdrifAD+ArB4uOpCbc+GFf8zAMcXVY/MVwDOWoZ2VR4AfV8DfBdR4KZk9Lpf/BzBUmNFEr/fyJz9GaBvLKPhblcA4bi9jwhPSCnD3W3LuktN6qd/U8fJJiFEihn7UzFNXUGdb9I2GjH7tjN4CwQ9bm1s+NDPAkqNpe/uewySPyDQjqTRsNUdQDy9gYneIfCmpBF6o9SkfvpHzPQLDNpFzM8kY6E97gBy/LtSqYRCVdFkTgGoeDpd8RcaZxrlrpRAu2Vo2/xcjF5jeb5SOtNowqV+LpnpOAP1eqkfWwujIi7zYPXFTH251Lh8HVEq3fC8YL+SGqfThqYVtnJirpIUk0boVq/tL8U+YqZ/UBJjIbG3oLQ4LurOgbRYjMhbEMDY2TAm7qLr/JBoKZdKp9S4BTWyU0mKKq8v4m5uGoyLvMAZRfj8VuvGBIX9SkosRtR1pRKF5uyk1xk/HzhktlWp0Sp/ITF3ao1FTaGJThNEX0VmfX1imk7EzTe4ngGMnxMuj3wQOAzQHywxwBQ8lakKnlL2wZHMUuLMUhKoA/haSKyes0e+iSNRsc+sbu1Ui1BKNJJAI3jsR2h0bBm9oNEfS/QKgV6/NoEZTaFCi302/78MYDZH2y3Xf803e0/EUquFAAAAAElFTkSuQmCC";

    describe("fromDataURL", () => {
        it("should convert Data URL to Blob", () => {
            const blob = fromDataURL(REF);
            expect(blob).toBeInstanceOf(Blob);
        });

        it("should reject bad inputs", () => {
            expect(() => fromDataURL("invalid")).toThrowError(
                "Invalid Data URL"
            );
        });
    });

    describe("toDataURL", () => {
        it("should convert Blob to Data URL", async () => {
            const url = await toDataURL(fromDataURL(REF));
            expect(url).toStrictEqual(REF);
        });
    });

    describe("toArrayBuffer", () => {
        it("should convert a Blob to an ArrayBuffer", async () => {
            const buffer = await toArrayBuffer(new Blob());
            expect(buffer).toBeInstanceOf(ArrayBuffer);
        });
    });

    describe("toDigest", () => {
        it("should compute the Digest of an ArrayBuffer", async () => {
            const originalCrypto = window.crypto;
            (window as { crypto: unknown }).crypto = {
                subtle: {
                    digest(algorithm: string, data: ArrayBuffer): ArrayBuffer {
                        const hash = crypto.createHash(
                            algorithm.replace("-", "").toLowerCase()
                        );
                        hash.update(Buffer.from(data));
                        return hash.digest();
                    },
                },
            };
            const blob = fromDataURL(REF);
            const buffer = await toArrayBuffer(blob);
            const digest = await toDigest(buffer);
            expect(digest).toStrictEqual(
                "9884bb3734e6f2b3c88f4ca5d48c8ea1bba82e4c"
            );
            (window as { crypto: unknown }).crypto = originalCrypto;
        });
    });

    describe("toVector", () => {
        it("should return the image dimensions", async () => {
            const originalCreateObjectURL = URL.createObjectURL;
            const originalRevokeObjectURL = URL.revokeObjectURL;
            URL.createObjectURL = jest.fn().mockReturnValue(REF);
            URL.revokeObjectURL = jest.fn();
            jest.spyOn(Image.prototype, "src", "set").mockImplementation(
                function (this: HTMLImageElement, src: string) {
                    if (src === REF) {
                        this.width = 48;
                        this.height = 48;
                    }
                    this.dispatchEvent(new Event("load"));
                    this.dispatchEvent(new Event("loadend"));
                }
            );
            const blob = fromDataURL(REF);
            const dimensions = await toVector(blob);
            expect(dimensions).toStrictEqual([48, 48]);
            expect(URL.revokeObjectURL).toHaveBeenCalled();
            URL.createObjectURL = originalCreateObjectURL;
            URL.revokeObjectURL = originalRevokeObjectURL;
        });
    });
});
