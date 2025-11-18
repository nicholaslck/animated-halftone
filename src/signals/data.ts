import { signal, effect, computed } from "@preact/signals-react";
import {
  asyncLoadImageData,
  downsampleImageData,
  imageData2Points,
  readFileAsDataURL,
} from "../utils/image";
import {
  createHalftoner,
  type Halftoner,
  type HalftonerID,
} from "../algorithms";
import { algoDescriptions, type AlgorithmDescriptions } from "../../.velite";

export const file = signal<File | null>(null);

export const imageData = signal<ImageData | null>(null);

export const algorithmId = signal<HalftonerID>("floyd-steinberg");

export const algorithm = computed<Halftoner>(() =>
  createHalftoner(algorithmId.value)
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
  const algo = algorithm.value;
  if (imageData.value) {
    return algo.process(imageData.value);
  } else {
    return null;
  }
});

export const imagePositions = computed(() => {
  if (!halftoneImage.value) return null;
  console.debug("imagePosition", halftoneImage.value.data[0]);
  return imageData2Points(halftoneImage.value);
});

const defaultCount = 40000 as const; // 200 * 200
export const particleCount = computed<number>(() => {
  if (!imagePositions.value) return defaultCount;
  return imagePositions.value.length / 3;
});

export const randomPositions = computed(() => {
  const pos = new Float32Array(particleCount.value * 3);
  let i3: number;
  for (let i = 0; i < particleCount.value; i++) {
    i3 = i * 3;
    pos[i3] = Math.random() * 2 - 1;
    pos[i3 + 1] = Math.random() * 2 - 1;
    pos[i3 + 2] = Math.random() * 2 - 1;
  }
  return pos;
});

export const currentAlgorithmIdForDescription =
  signal<HalftonerID>("floyd-steinberg");

export const currentAlgorithmDescription =
  computed<AlgorithmDescriptions | null>(() => {
    switch (currentAlgorithmIdForDescription.value) {
      case "floyd-steinberg":
        return algoDescriptions.find((algo) => algo.slug === "floyd-steinberg");
      case "ostromoukhov's":
        return algoDescriptions.find((algo) => algo.slug === "ostromoukhovs");
      case "threshold":
        return algoDescriptions.find((algo) => algo.slug === "threshold");
      default:
        return null;
    }
  });

effect(() => console.table(currentAlgorithmDescription.value));
