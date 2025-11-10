export const HalftonerIDs = [
  "floyd-steinberg",
  "ostromoukhov's",
  "threshold",
] as const;

export type HalftonerID = (typeof HalftonerIDs)[number];

/* All halftoning algorithm must implement the Halftoner interface  */
export interface Halftoner {
  id: HalftonerID;
  name: string;
  process(image: ImageData): ImageData;
}
