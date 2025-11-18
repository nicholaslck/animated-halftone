import { describe, it, expect } from "vitest";
import { FloydSteinbergErrorDiffusion } from "../../src/algorithms/halftoners/floyd-steinberg";
import { loadImageData, writeImage } from "../utils/image";
import pixelmatch from "pixelmatch";

describe("FloydSteinbergErrorDiffusion", () => {
  it("should process an image and return the correct halftone representation", async () => {
    const input = await loadImageData("test/imgs/david.png");
    const expected = await loadImageData("test/imgs/david-fs.png");

    const result = new FloydSteinbergErrorDiffusion().process(input);
    await writeImage(result, "test/imgs/results/david-fs.png");

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
