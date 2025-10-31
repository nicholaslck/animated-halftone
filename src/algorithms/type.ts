/* All halftoning algorithm must implement the Halftoner interface  */
export interface Halftoner {
  name: string;
  description: string;

  process(imageData: ImageData): ImageData;
}

export const HalftonerIDs = ["floyd-steinberg", "ostromoukhov's"] as const;

export type HalftonerID = (typeof HalftonerIDs)[number];
