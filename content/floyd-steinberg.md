# Floyd–Steinberg Error Diffusion dithering

## Background

Halftoning renders continuous tones with discrete dots. Early digital printers and displays often had 1‑bit output, so arranging black/white pixels to approximate grayscale was crucial. In 1976, Robert Floyd and Louis Steinberg introduced error diffusion: quantize each pixel, compute its error, and distribute that error forward to neighbors. This produced fine, blue‑noise‑like textures, preserved edges, and avoided large‑scale bias compared to fixed thresholds. Their method became the standard, inspiring variants like Jarvis–Judice–Ninke, Stucki, Burkes, and serpentine scanning, plus multi‑level and color extensions.

## Formulation

Let $x[i, j]$ be the input intensity. For a RGB image, usually the pixel ranges from 0-255. To simplify the math, we normalize the pixel values from 0-255 to 0–1.

For binary halftones, $q(i, j) ∈ {0, 1}$. Define the quantization error $e(i, j) = x[i, j] − q(i, j)$. Diffuse $e(i, j)$ to future neighbors in raster order with weights summing to 1:

- Right: $x[i, j+1] += e(i, j) × \frac{7}{16}$

- Down‑left: $x[i+1, j−1] += e(i, j) × \frac{3}{16}$

- Down: $x[i+1, j] += e(i, j) × \frac{5}{16}$

- Down‑right: $x[i+1, j+1] += e(i, j) × \frac{1}{16}$

The above diffusion logic can be express in a diffusion kernel. A kernel is the weights apply to neighbours pixels (the center $*$ is current pixel):

$$
\begin{bmatrix}

& * & \frac{7}{16} \\

\frac{3}{16} & \frac{5}{16} & \frac{1}{16}

\end{bmatrix}
$$

![diffusion direction](/animated-halftone/fs-diffuse-direction.png)

Binary quantization and error:

$$
q(i,j)=\begin{cases}

1, & x[i,j]\ge T \\

0, & x[i,j]< T

\end{cases}

\qquad

e(i,j)=x[i,j]-q(i,j)
$$

Notes:

- Use T=0.5 for normalized inputs, or nearest level for multi‑level palettes.

- Serpentine scanning mirrors the kernel when moving right‑to‑left to reduce directional artifacts.

- Clamp updated x-values to [0, 1] to avoid runaway highlights/shadows.

- Kernel normalization ensures unbiased tone reproduction in expectation.
