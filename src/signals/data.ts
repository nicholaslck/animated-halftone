import { signal, effect, computed } from "@preact/signals-react";
import { asyncLoadImageData, readFileAsDataURL } from "../utils/image";
import floyd_steinberg from "floyd-steinberg";

export const file = signal<File | null>(null);

export const imageData = signal<ImageData | null>(null);

effect(() => {
  if (!file.value) {
    imageData.value = null;
    return;
  }

  readFileAsDataURL(file.value).then((data) => {
    asyncLoadImageData(data as string).then((imgData) => {
      imageData.value = imgData;
    });
  });
});

export const halftoneImage = computed(() => {
  if (!imageData.value) return null;
  return floyd_steinberg(imageData.value);
});
