import { type Halftoner, type HalftonerID } from "../type";
import { convertRGBAtoL, copyImage } from "../utils";

export class Threshold implements Halftoner {
  id: HalftonerID = "threshold";
  name = "Threshold Dithering";

  process(image: ImageData): ImageData {
    // Create a deep copy of the image data to avoid mutating the original.
    const imageCopy = copyImage(image);

    // Work on the copy's data.
    const data = new Float64Array(convertRGBAtoL(imageCopy).data);

    for (let i = 0; i < data.length; i = i + 4) {
      data[i] = data[i] <= 127.5 ? 0.0 : 255.0;
      data[i + 1] = data[i];
      data[i + 2] = data[i];
      data[i + 3] = 255;
    }

    // Write the final data back to the copy and return it.
    imageCopy.data.set(new Uint8ClampedArray(data));
    return imageCopy;
  }
}
