import { describe, it, expect } from "vitest";
import { Threshold } from "../../src/algorithms/halftoners/threshold";
import { loadImageData, writeImage } from "../utils/image";
import pixelmatch from "pixelmatch";

describe("Threshold", () => {
  it("should process an image", async () => {
    const input = await loadImageData("test/imgs/david.png");
    const expected = await loadImageData("test/imgs/david-threshold.png");

    const result = new Threshold().process(input);
    await writeImage(result, "test/imgs/results/david-threshold.png");

    expect(result.width).toEqual(expected.width);
    expect(result.height).toEqual(expected.height);
    expect(
      pixelmatch(
        result.data,
        expected.data,
        undefined,
        input.width,
        input.height
      )
    ).toEqual(0);
  });
});
