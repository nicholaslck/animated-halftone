/**
 * Check if OffscreenCanvas is supported in the current environment
 * @returns True if OffscreenCanvas is available
 */
export function isOffscreenCanvasSupported(): boolean {
  // Check if OffscreenCanvas constructor exists in global scope
  // Using typeof prevents ReferenceError in environments where it doesn't exist
  return typeof OffscreenCanvas !== "undefined";
}

/**
 * Load image data with automatic fallback
 * Uses OffscreenCanvas if available, falls back to regular canvas
 * @param imagePath - URL or path to the image
 * @returns Promise that resolves with ImageData object with:
 * - data: Uint8ClampedArray of [R,G,B,A,R,G,B,A,...]
 * - width: image width in pixels
 * - height: image height in pixels
 */
export async function asyncLoadImageData(
  imagePath: string,
): Promise<ImageData> {
  return new Promise<ImageData>((resolve, reject) => {
    // Create an Image object to load the image
    const img = new Image();

    // Handle CORS if loading from external sources
    // This allows canvas to read pixel data from cross-origin images
    img.crossOrigin = "anonymous";

    img.onload = () => {
      let canvas: HTMLCanvasElement | OffscreenCanvas;
      let ctx:
        | CanvasRenderingContext2D
        | OffscreenCanvasRenderingContext2D
        | null;

      // Feature detection with if-else
      if (isOffscreenCanvasSupported()) {
        console.log("Using OffscreenCanvas (modern browser)");
        // Create an explicitly offscreen canvas
        // This is more semantic and can be used in Web Workers
        canvas = new OffscreenCanvas(img.width, img.height);
        ctx = canvas.getContext("2d");
      } else {
        console.log("Using regular Canvas (fallback for older browsers)");
        // Create offscreen DOM canvas (never appended to document)
        canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext("2d");
      }

      // Check if context was successfully created
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // The rest is identical regardless of canvas type
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Extract all pixel data from the canvas
      // getImageData returns an ImageData object with:
      // - data: Uint8ClampedArray of [R,G,B,A,R,G,B,A,...]
      // - width: image width in pixels
      // - height: image height in pixels
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      resolve(imageData);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imagePath}`));
    };

    // Start loading the image
    img.src = imagePath;
  });
}

export function imageData2Points(imageData: ImageData): Float32Array {
  let px: number = 0;
  let w: number;
  let h: number;
  let r: number, g: number, b: number;

  const points = [];

  for (h = 0; h < imageData.height; h++) {
    for (w = 0; w < imageData.width; w++) {
      px = h * imageData.width + w;
      r = imageData.data[px * 4];
      g = imageData.data[px * 4 + 1];
      b = imageData.data[px * 4 + 2];

      if (r < 128 || g < 128 || b < 128) {
        // place a vertex in the [-1,1] coordinate system
        const normalized_w = (2 * w) / imageData.width - 1;
        const normalized_h = 1 - (2 * h) / imageData.height;
        points.push(normalized_w, normalized_h, 0);
      }
    }
  }

  return new Float32Array(points);
}
