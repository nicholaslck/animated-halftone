import { type Halftoner, type HalftonerID } from "./type";
import { convertRGBAtoL } from "./utils";

const kernel = [
  [1, 0, 7 / 16],
  [-1, 1, 3 / 16],
  [0, 1, 5 / 16],
  [1, 1, 1 / 16],
] as const;

export class FloydSteinbergErrorDiffusion implements Halftoner {
  id: HalftonerID = "floyd-steinberg";

  process(image: ImageData): ImageData {
    // Create a deep copy of the image data to avoid mutating the original.
    const imageCopy = new ImageData(
      new Uint8ClampedArray(image.data),
      image.width,
      image.height,
    );

    console.debug("Processing Floyd-Steinberg error diffusion");
    const w = imageCopy.width;
    const h = imageCopy.height;
    // Work on the copy's data.
    const data = new Float64Array(convertRGBAtoL(imageCopy).data);

    let currentPixel, newPixelValue, err;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        currentPixel = y * w * 4 + x * 4;
        newPixelValue = data[currentPixel] <= 127.5 ? 0.0 : 255.0;
        err = data[currentPixel] - newPixelValue;
        data[currentPixel] = newPixelValue;

        for (const k of kernel) {
          const [dx, dy, coef] = k;
          if (0 <= x + dx && x + dx < w && 0 <= y + dy && y + dy < h) {
            data[(y + dy) * w * 4 + (x + dx) * 4] += err * coef;
          }
        }

        // Set g and b values equal to r (effectively greyscales the image fully)
        data[currentPixel + 1] = data[currentPixel + 2] = data[currentPixel];
      }
    }

    // Write the final data back to the copy and return it.
    imageCopy.data.set(new Uint8ClampedArray(data));
    return imageCopy;
  }
}
