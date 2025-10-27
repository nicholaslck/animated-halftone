import { signal, effect } from "@preact/signals-react";
import { asyncLoadImageData, readFileAsDataURL } from "../utils/image";

export const file = signal<File | null>(null);

export const imageData = signal<ImageData | null>(null);

effect(() => {
  if (file.value) {
    readFileAsDataURL(file.value).then((data) => {
      loadDemoImageData(data as string);
    });
  }
});

async function loadDemoImageData(imgSrc: string) {
  const _imageData: ImageData = await asyncLoadImageData(imgSrc);
  console.log(_imageData.width, _imageData.height);
  imageData.value = _imageData;
  console.log("updated");
}

// loadDemoImageData("/halftone_demo.png");
