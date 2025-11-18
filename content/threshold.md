# Threshold Dithering

## Background

Halftone threshold dithering is a binarization technique used to convert a grayscale image into a two-tone (black–white) image. It applies a fixed threshold to each pixel independently: pixels brighter than the threshold become white, and darker pixels become black. This simple, per-pixel decision preserves overall structure but does not propagate quantization error to neighbors, so it tends to produce sharper transitions and potential contouring compared to error-diffusion methods (e.g., Floyd–Steinberg). It is computationally efficient and often used as a baseline or for fast preview/printing paths.

## Formulation

Let $I(x, y) \in [0, 255]$ denote the input grayscale intensity at pixel coordinate $(x, y)$, and let $T$ be the threshold. With $T = 127.5$ (midpoint of 0–255), the threshold dithering operation is defined as follows:

- Binary output $B(x, y) \in \{0, 255\}$ is defined by a   hard comparison:

  - If $I(x, y) > T$, set $B(x, y) = 255$ (white)

  - Otherwise, $B(x, y) = 0$ (black)

## Drawbacks

Although easy to implement, the halftone image can lose local structure because neighboring pixels are merged into uniform regions when values fall on the same side of the threshold, reducing fine detail and producing blocky areas in textured zones.
