import { vi } from "vitest";

vi.stubGlobal(
  "ImageData",
  class ImageData {
    data: ImageDataArray;
    width: number;
    height: number;
    constructor(data, width, height) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  },
);
