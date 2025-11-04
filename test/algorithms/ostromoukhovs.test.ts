import { describe, it, expect } from "vitest";
import { OstromoukhovsErrorDiffusion } from "../../src/algorithms/ostromoukhovs";
import { loadImageData, writeImage } from "../utils/image";
import pixelmatch from "pixelmatch";

describe("Ostromoukhovs", () => {
  it("should process an image", async () => {
    const input = await loadImageData("test/imgs/david.png");
    const expected = await loadImageData("test/imgs/david-ov.png");

    const result = new OstromoukhovsErrorDiffusion().process(input);
    await writeImage(result, "test/imgs/results/david-ov.png");

    expect(result.width).toEqual(expected.width);
    expect(result.height).toEqual(expected.height);
    expect(
      pixelmatch(
        result.data,
        expected.data,
        undefined,
        input.width,
        input.height,
      ),
    ).toEqual(0);
  });
});
