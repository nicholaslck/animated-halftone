import { signal, effect } from "@preact/signals-react";
import { asyncLoadImageData, readFileAsDataURL } from "../utils/image";

export const file = signal<File | null>(null);

export const imageData = signal<ImageData | null>(null);

effect(() => {
  if (!file.value) {
    imageData.value = null;
    return;
  }

  readFileAsDataURL(file.value).then((data) => {
    loadDemoImageData(data as string);
  });
});

async function loadDemoImageData(imgSrc: string) {
  const _imageData: ImageData = await asyncLoadImageData(imgSrc);
  imageData.value = _imageData;
}

// loadDemoImageData("/halftone_demo.png");
