/** All states related to graphic rendering is hosted here. */

import { computed } from "@preact/signals-react";
import { imageData } from "./data";
import { imageData2Points } from "../utils/image";

export const imagePositions = computed(() => {
  if (!imageData.value) return null;
  return imageData2Points(imageData.value);
});

export const particleCount = computed<number>(() => {
  if (!imagePositions.value) return 256 * 256;
  return imagePositions.value.length;
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
