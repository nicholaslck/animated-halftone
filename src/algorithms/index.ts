import type { Halftoner, HalftonerID } from "./type";
import { FloydSteinbergErrorDiffusion } from "./halftoners/floyd-steinberg";
import { OstromoukhovsErrorDiffusion } from "./halftoners/ostromoukhovs";
import { Threshold } from "./halftoners/threshold";

export { HalftonerIDs } from "./type";
export type { Halftoner, HalftonerID } from "./type";

export function createHalftoner(id: HalftonerID): Halftoner {
  switch (id) {
    case "floyd-steinberg":
      return new FloydSteinbergErrorDiffusion();
    case "ostromoukhov's":
      return new OstromoukhovsErrorDiffusion();
    case "threshold":
      return new Threshold();
    default:
      throw new Error(`Unknown halftoner: ${id}`);
  }
}
