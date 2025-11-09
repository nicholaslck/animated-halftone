const lr = Object.freeze(new Array(256).fill(0).map((_, i) => i * 0.299));
const lg = Object.freeze(new Array(256).fill(0).map((_, i) => i * 0.587));
const lb = Object.freeze(new Array(256).fill(0).map((_, i) => i * 0.114));

/** Converts RGBA image data to luminance
 * @param data - ImageDataArray. The image data to convert
 */
export function convertRGBAtoL(image: ImageData) {
  const data = new Float64Array(image.data);
  for (let i = 0; i < image.data.length; i += 4) {
    data[i] = lr[image.data[i]] + lg[image.data[i + 1]] + lb[image.data[i + 2]];
    data[i + 1] = data[i];
    data[i + 2] = data[i];
  }
  image.data.set(data);
  return image;
}

export function copyImage(image: ImageData) {
  return new ImageData(image.data.slice(), image.width, image.height);
}
