/* All halftoning algorithm must implement the Halftoner interface  */
export interface Halftoner {
  name: string;
  description: string;

  process(imageData: ImageData): ImageData;
}

export type HalftonerID = "floyd-steinberg";
