# Ostromoukhov’s Error Diffusion dithering

## Background

Victor Ostromoukhov proposed a simple, fast error‑diffusion algorithm that replaces the fixed Floyd–Steinberg weights with tone‑dependent coefficients in 2001. For each input gray level (e.g., 256 levels), the algorithm selects a small set of diffusion weights tailored to that tone, often distributing error to only three future neighbors. By adapting the diffusion locally, it suppresses structural artifacts (e.g. checkerboards pattern) that plague fixed kernels at specific intensities, diagonal stripes and pushes energy into high spatial frequencies, yielding the desired blue‑noise texture.

## Core idea:

- Instead of a single kernel for all tones, use a per‑tone kernel chosen from precomputed, efficient patterns.

- Keep the scheme computationally light: few neighbors, integer‑friendly weights, and raster or serpentine traversal.

## Benifits:

- Produces smoother mid‑tones and fewer repetitive patterns than fixed‑kernel (e.g. Floyd-Steinberg) methods.

- Maintains detail while reducing worming and banding, especially in low‑gradient regions.

- Comparable speed to Floyd–Steinberg but with higher perceptual quality.

## What the algorithm changes (vs. Floyd–Steinberg) ￼

- Traversal: Use a serpentine scan (alternate left→right, right→left on each row) to limit directional artifacts.

- Neighbors: Diffuse error to only three “future” neighbors per pixel: N10, N11, N01 (right, down‑right, down). This cuts operations and memory access while keeping quality high.

![Diffusion directions](/animated-halftone/ov-diffuse-direction.png)

- Tone‑dependent weights: Use 256 distinct sets of diffusion coefficients—one for each 8‑bit input level—hardcoded for speed.

- Speed and simplicity: Fewer destinations and simple lookups make it faster than classic Floyd–Steinberg while preserving edge sharpness.

![Comparison of between Floyd-Steinberg and Ostromoukhov's error diffusion](/animated-halftone/fs-vs-ov.png)

Comparison of Floyd-Steinberg (left) and Ostromoukhov's (right) error diffusion. Note the distribution of dots is less regular, here we would claim the blue-noise property is better achieved with Ostromoukhov's method.

References for deeper reading:

- [A Simple and Efficient Error-Diffusion Algorithm](https://perso.liris.cnrs.fr/victor.ostromoukhov/publications/pdf/SIGGRAPH01_varcoeffED.pdf)
- [ACM Digital Library: A simple and efficient error-diffusion algorithm](https://dl.acm.org/doi/10.1145/383259.383326)
