import type { Halftoner, HalftonerID } from "./type";
import { FloydSteinbergErrorDiffusion } from "./floyd-steinberg";

export { HalftonerIDs } from "./type";
export type { Halftoner, HalftonerID } from "./type";

export { FloydSteinbergErrorDiffusion } from "./floyd-steinberg";

export function createHalftoner(id: HalftonerID): Halftoner {
  switch (id) {
    case "floyd-steinberg":
      return new FloydSteinbergErrorDiffusion();
    case "ostromoukhov's":
      // TODO:
      throw new Error("Ostromoukhov's halftoner is not implemented yet");
    default:
      throw new Error(`Unknown halftoner: ${name}`);
  }
}
