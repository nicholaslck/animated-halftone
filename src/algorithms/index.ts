import { type Halftoner, type HalftonerID } from "./type";
import { FloydSteinbergErrorDiffusion } from "./floyd-steinberg";

export { type Halftoner, type HalftonerID } from "./type";
export { FloydSteinbergErrorDiffusion } from "./floyd-steinberg";

export function createHalftoner(id: HalftonerID): Halftoner {
  switch (id) {
    case "floyd-steinberg":
      return new FloydSteinbergErrorDiffusion();
    default:
      throw new Error(`Unknown halftoner: ${name}`);
  }
}
