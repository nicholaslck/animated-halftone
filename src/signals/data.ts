import { signal } from "@preact/signals-react";
import { asyncLoadImageData } from "../utils/image";

export const file = signal<File | null>(null);

export const imageData = signal<ImageData | null>(null);

function loadDemoImageData() {
  const filePath = "/halftone_demo.png";

  asyncLoadImageData(filePath).then((_imageData: ImageData) => {
    console.log(_imageData.width, _imageData.height);
    imageData.value = _imageData;
  });
}

loadDemoImageData();
