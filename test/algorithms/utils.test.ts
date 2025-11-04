import { describe, it, expect } from "vitest";
import { convertRGBAtoL } from "../../src/algorithms/utils";

describe("algorithms/utils", () => {
  describe("convertRGBAtoL", () => {
    it("should convert RGBA image data to luminance", () => {
      const width = 2;
      const height = 2;

      // prettier-ignore
      const data = new Uint8ClampedArray([
        255, 0, 0,255, // red
        0, 255, 0, 255, // green
        0, 0, 255, 255, // blue
        255, 255, 255, 255, // white
      ]);
      const imageData = new ImageData(data, width, height);

      const result = convertRGBAtoL(imageData);

      // prettier-ignore
      const expectedData = new Uint8ClampedArray([
        76, 76, 76, 255,
        150, 150, 150, 255,
        29, 29, 29, 255,
        255, 255, 255, 255,
      ]);

      expect(result.data).toEqual(expectedData);
      expect(result.width).toBe(width);
      expect(result.height).toBe(height);
    });

    it("should handle a black image", () => {
      const width = 1;
      const height = 1;
      const data = new Uint8ClampedArray([0, 0, 0, 255]);
      const imageData = new ImageData(data, width, height);

      const result = convertRGBAtoL(imageData);

      const expectedData = new Uint8ClampedArray([0, 0, 0, 255]);

      expect(result.data).toEqual(expectedData);
    });

    it("should handle an image with alpha transparency", () => {
      const width = 1;
      const height = 1;
      const data = new Uint8ClampedArray([100, 150, 200, 128]);
      const imageData = new ImageData(data, width, height);

      const result = convertRGBAtoL(imageData);

      // Luminance = 100 * 0.299 + 150 * 0.587 + 200 * 0.114 = 29.9 + 88.05 + 22.8 = 140.75 -> 141
      const expectedData = new Uint8ClampedArray([141, 141, 141, 128]);

      expect(result.data).toEqual(expectedData);
    });
  });
});
