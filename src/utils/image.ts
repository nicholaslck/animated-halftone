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
 * @param imgSrc - URL or path to the image
 * @returns Promise that resolves with ImageData object with:
 * - data: Uint8ClampedArray of [R,G,B,A,R,G,B,A,...]
 * - width: image width in pixels
 * - height: image height in pixels
 */
export async function asyncLoadImageData(imgSrc: string): Promise<ImageData> {
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
      if (!isOffscreenCanvasSupported()) {
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
      reject(new Error(`Failed to load image: ${imgSrc}`));
    };

    // Start loading the image
    img.src = imgSrc;
  });
}

/**
 * Converts image data into a set of 3D points.
 *
 * This function iterates over the pixels of the input `ImageData`. For each pixel that
 * is considered "dark" (where any of the red, green, or blue color channels have a
 * value less than 128), it generates a corresponding 3D point.
 *
 * The X and Y coordinates of the point are normalized to a [-1, 1] range, representing
 * the pixel's position within the image dimensions. The Z coordinate is always set to 0.
 *
 * @param imageData - The ImageData object to process.
 * @returns A Float32Array containing the generated 3D points, with each point
 *          represented by three consecutive values (x, y, z).
 */
export function imageData2Points(imageData: ImageData): Float32Array {
  let px: number = 0;
  let w: number;
  let h: number;
  let r: number, g: number, b: number;

  const points = [];

  console.time("imageData2Points");

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

  console.timeEnd("imageData2Points");

  return new Float32Array(points);
}

/**
 * Reads a File object as a Data URL using FileReader
 * @param {File} file - The file to read
 * @returns {Promise<string>} - Data URL string
 */
export function readFileAsDataURL(
  file: File,
): Promise<string | ArrayBuffer | null | undefined> {
  return new Promise((resolve, reject) => {
    // FileReader is an async API for reading file contents
    const reader = new FileReader();

    // Event fired when reading completes successfully
    reader.onload = (event) => {
      // event.target.result contains the data URL string
      resolve(event.target?.result);
    };

    // Event fired if reading fails
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    // Start reading the file as a Data URL
    // This is async - the file is read in chunks by the browser
    reader.readAsDataURL(file);
  });
}
