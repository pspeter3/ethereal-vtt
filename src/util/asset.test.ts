import { AssetType, fromDataURL, fromFile, toBlob, toDataURL } from "./asset";

describe("asset", () => {
    const ASSET_URL =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFKElEQVRoQ+1ZS2xUVRj+/jMdKhSaiFFDsb1DFcXIAuMbFnbulIXiRpP6pEaDzJ0mxoWCugELbFTQhTHp3EGiEfDVRDZWFzB36qL4QCMLjCha5rZSIkZMKgXLdM5vzm2nacudztzOndZJuMms5n995z+P73yHUOEfVXj9uAwg18FIwm6GZA0kNMncSEQ3ALx89H86wcy/CqJesLQhyE5GtUN+dL+kDjR1nAyRoBYCtQC4w2NBRxjcyZI7u9uWpT36jpvPCEB4d//9xKyKbgFzjRON+QAReliIATmSPR0IBAf+DZw7rf66IrtwSTabqRNVgSUkZR0z1oDowdHm0BCATibqTG2s/9wrEM8AwmZ6C4G2j02Nc2DeB8F7rWjosJfkeiK9GpJaQbQe4IXOGIC3pozQDi9xPAGImPZHDDziJJByG0Rgr2U0/OYl4VRb3ey7HuD1ANqdhgAfJw3t0WJjFg1AN+1jAG4B8yAEPWtFtb3FJinGTk/YrZD8NohqAfxoGdrKYvyKAqCbNo+ODh+dN5y594vnlg8WE9yrzX1vnai9WB38kkGrlK9laAXrK2gQNu2DBDSrKWO1LXPaXO5P7zjZDiFeYeBQytDWTpdvWgC5BUtAV9LQHih34RPjR0z7MwbWFVrYeQHo8b4YiDsAnLkwJEJfPV9/YTYB3PNm//z5NVKdD9eAqc2KNcTd8rsCcPZ5KbtGt2ms9evU9DoA6nRnxkFnixVinds54QpAT/S9C+anZnPe5wOXWw8ges+KNjw91e4SAIoeiEDgmDpVAKwqdZ/3Ouru5wSOgkAym105lXZcAiBspjcT6HUw4lZMayu1AD/89bjdAUKMwS+mjNDOiTEvAaCb9rcOMSNe45Ue+FGsWwyHdjD1ADhiGdqdeQGMLxrmA1Ys9FC5CppJXD2e/lQRwKmbyqQOhON2lAgmiDdb0dCumSQql4+eSG8C005mGKmYlsjlmQRAT9ivgvESCE/6zXVKBeZwJcb7ILxmRbWX3QGY9ieK4zOjORXTkqUm9dM/HLcjRFC3uE7L0B52BxC3vwPhNongzd1G3XE/Cyg1VpM5sEIg8xMY31sx7fZ8HTgL4MrhqgW1PRuu/qfUpH76r9nz56LqkfOKBf9tGdrifAD+ArB4uOpCbc+GFf8zAMcXVY/MVwDOWoZ2VR4AfV8DfBdR4KZk9Lpf/BzBUmNFEr/fyJz9GaBvLKPhblcA4bi9jwhPSCnD3W3LuktN6qd/U8fJJiFEihn7UzFNXUGdb9I2GjH7tjN4CwQ9bm1s+NDPAkqNpe/uewySPyDQjqTRsNUdQDy9gYneIfCmpBF6o9SkfvpHzPQLDNpFzM8kY6E97gBy/LtSqYRCVdFkTgGoeDpd8RcaZxrlrpRAu2Vo2/xcjF5jeb5SOtNowqV+LpnpOAP1eqkfWwujIi7zYPXFTH251Lh8HVEq3fC8YL+SGqfThqYVtnJirpIUk0boVq/tL8U+YqZ/UBJjIbG3oLQ4LurOgbRYjMhbEMDY2TAm7qLr/JBoKZdKp9S4BTWyU0mKKq8v4m5uGoyLvMAZRfj8VuvGBIX9SkosRtR1pRKF5uyk1xk/HzhktlWp0Sp/ITF3ao1FTaGJThNEX0VmfX1imk7EzTe4ngGMnxMuj3wQOAzQHywxwBQ8lakKnlL2wZHMUuLMUhKoA/haSKyes0e+iSNRsc+sbu1Ui1BKNJJAI3jsR2h0bBm9oNEfS/QKgV6/NoEZTaFCi302/78MYDZH2y3Xf803e0/EUquFAAAAAElFTkSuQmCC";
    const ASSET_HASH = "9884bb3734e6f2b3c88f4ca5d48c8ea1bba82e4c";
    const ASSET_SIZE = [48, 48];

    function mockImage<T>(url: string, callback: () => T): T {
        (URL.createObjectURL as jest.Mock).mockReturnValue(url);
        jest.spyOn(Image.prototype, "src", "set").mockImplementation(function (
            this: HTMLImageElement,
            src: string,
        ) {
            if (src === ASSET_URL) {
                const [width, height] = ASSET_SIZE;
                this.width = width;
                this.height = height;
            }
            this.dispatchEvent(new Event("load"));
            this.dispatchEvent(new Event("loadend"));
        });
        const result = callback();
        expect(URL.createObjectURL).toHaveBeenCalled();
        expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
        return result;
    }

    describe("fromDataURL", () => {
        it("should convert valid DataURLs", () =>
            mockImage(ASSET_URL, async () => {
                const asset = await fromDataURL(ASSET_URL);
                expect(asset.hash).toEqual(ASSET_HASH);
                expect(asset.type).toEqual(AssetType.PNG);
                expect(asset.size).toEqual(ASSET_SIZE);
            }));

        it("should reject invalid DataURL", async () => {
            await expect(fromDataURL("invalid")).rejects.toThrowError(
                "Invalid DataURL",
            );
        });

        it("should reject invalid AssetType", async () => {
            await expect(
                fromDataURL("data:image/svg;base64,invalid"),
            ).rejects.toThrowError("Invalid AssetType image/svg");
        });
    });

    describe("fromFile", () => {
        it("should convert files", async () => {
            const blob = toBlob(await fromDataURL(ASSET_URL));
            const file = new File([blob], "test.png", {
                type: AssetType.PNG,
            });
            const asset = await fromFile(file);
            expect(asset.hash).toEqual(ASSET_HASH);
            expect(asset.type).toEqual(AssetType.PNG);
            expect(asset.size).toEqual(ASSET_SIZE);
        });
    });

    describe("toBlob", () => {
        it("should convert an Asset to a Blob", async () => {
            const asset = await fromDataURL(ASSET_URL);
            const blob = toBlob(asset);
            expect(blob).toBeInstanceOf(Blob);
            expect(blob.type).toEqual(asset.type);
        });
    });

    describe("toDataURL", () => {
        it("should convert an Asset to a DataURL", async () => {
            const asset = await fromDataURL(ASSET_URL);
            const dataURL = await toDataURL(asset);
            expect(dataURL).toEqual(ASSET_URL);
        });
    });
});
