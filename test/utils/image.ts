import sharp from "sharp";

/**
 * Load image data
 * @param imgSrc - URL or path to the image
 * @returns Promise that resolves with ImageData object with:
 * - data: Uint8ClampedArray of [R,G,B,A,R,G,B,A,...]
 * - width: image width in pixels
 * - height: image height in pixels
 */
export async function loadImageData(path: string): Promise<ImageData> {
  try {
    const { data, info } = await sharp(path)
      .ensureAlpha()
      .raw() // Get raw pixel data
      .toBuffer({ resolveWithObject: true }); // Get buffer and metadata
    // 'data' is a Buffer containing the raw pixel data (RGBA)
    // 'info' contains metadata like width, height, channels, etc.

    // You can then convert this Buffer to a Uint8ClampedArray if needed
    // for compatibility with browser-like ImageData structures.
    const uint8ClampedArray = new Uint8ClampedArray(data);

    return new ImageData(uint8ClampedArray, info.width, info.height);
  } catch (error) {
    console.error("Error reading PNG with sharp:", error);
    throw error;
  }
}

export async function writeImage(imageData: ImageData, path: string) {
  try {
    await sharp(Buffer.from(imageData.data), {
      raw: {
        width: imageData.width,
        height: imageData.height,
        channels: 4, // RGBA
      },
    }).toFile(path);
  } catch (error) {
    console.error(`Failed to write image to ${path}`, error);

    throw error;
  }
}
