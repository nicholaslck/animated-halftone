import { signal, effect, computed } from "@preact/signals-react";
import {
  asyncLoadImageData,
  downsampleImageData,
  readFileAsDataURL,
} from "../utils/image";
import {
  createHalftoner,
  type Halftoner,
  type HalftonerID,
} from "../algorithms";

export const file = signal<File | null>(null);

export const imageData = signal<ImageData | null>(null);

export const algorithmId = signal<HalftonerID>("floyd-steinberg");

export const algorithm = computed<Halftoner>(() =>
  createHalftoner(algorithmId.value),
);

effect(() => {
  if (!file.value) {
    imageData.value = null;
    return;
  }

  readFileAsDataURL(file.value).then((data) => {
    asyncLoadImageData(data as string).then((imgData) => {
      imageData.value = downsampleImageData(imgData, 1920);
    });
  });
});

export const halftoneImage = computed(() => {
  if (!imageData.value) return null;
  return algorithm.value.process(imageData.value);
});
