import floyd_steinberg from "floyd-steinberg";
import type { Halftoner } from "./type";

export class FloydSteinbergErrorDiffusion implements Halftoner {
  name = "Floyd-Steinberg";
  description = "Floyd-Steinberg error diffusion algorithm";

  process(imageData: ImageData): ImageData {
    return floyd_steinberg(imageData);
  }
}
