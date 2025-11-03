import { type Halftoner, type HalftonerID } from "./type";

const kernel = [
  [1, 0, 7 / 16],
  [-1, 1, 3 / 16],
  [0, 1, 5 / 16],
  [1, 1, 1 / 16],
] as const;

export class FloydSteinbergErrorDiffusion implements Halftoner {
  id: HalftonerID = "floyd-steinberg";

  process(image: ImageData): ImageData {
    const w = image.width;
    const h = image.height;
    const data = new Float32Array(image.data);

    let currentPixel, newPixelValue, err;

    // Greyscale luminance (sets r pixels to luminance of rgb)
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] * 0.229 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    }

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        currentPixel = y * image.width * 4 + x * 4;
        newPixelValue = data[currentPixel] <= 127.5 ? 0 : 255;
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

    image.data.set(data);
    return image;
  }
}
