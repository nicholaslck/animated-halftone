import type { Halftoner, HalftonerID } from "./type";
import { FloydSteinbergErrorDiffusion } from "./floyd-steinberg";

import { OstromoukhovsErrorDiffusion } from "./ostromoukhovs";

export { HalftonerIDs } from "./type";
export type { Halftoner, HalftonerID } from "./type";

export { FloydSteinbergErrorDiffusion } from "./floyd-steinberg";

export function createHalftoner(id: HalftonerID): Halftoner {
  switch (id) {
    case "floyd-steinberg":
      return new FloydSteinbergErrorDiffusion();
    case "ostromoukhov's":
      return new OstromoukhovsErrorDiffusion();
    default:
      throw new Error(`Unknown halftoner: ${id}`);
  }
}
