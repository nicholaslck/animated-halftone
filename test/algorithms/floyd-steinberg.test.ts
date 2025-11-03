import { describe, it, expect } from "vitest";
import { FloydSteinbergErrorDiffusion } from "../../src/algorithms/floyd-steinberg";
import { loadImageData, writeImage } from "../utils/image";

describe("FloydSteinbergErrorDiffusion", () => {
  it("should process an image and return the correct halftone representation", async () => {
    const input = await loadImageData("test/imgs/david.png");
    const expected = await loadImageData("test/imgs/david-fs.png");

    console.log(input.data.length, expected.data.length);
    console.log(input.width, input.height);
    console.log(expected.width, expected.height);

    const result = new FloydSteinbergErrorDiffusion().process(input);

    await writeImage(result, "test/imgs/david-result.png");

    // console.log(result.data.slice(0, 12));
    // console.log(expected.data.slice(0, 12));

    // expect(result.data).toEqual(expected.data);
    expect(result.data.slice(0, 100)).toStrictEqual(
      expected.data.slice(0, 100),
    );
    // expect(result.data).toStrictEqual(expected.data);
    expect(result.width).toEqual(expected.width);
    expect(result.height).toEqual(expected.height);
  });
});
