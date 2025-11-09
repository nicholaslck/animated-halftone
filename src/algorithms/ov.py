import numpy as np


# A simple and efficient error-diffusion algorithm
# DOI: https://doi.org/10.1145/383259.383326
# PDF: https://perso.liris.cnrs.fr/victor.ostromoukhov/publications/pdf/SIGGRAPH01_varcoeffED.pdf
# Slower with JIT
# @numba.jit(nopython=True)
def dither_ostromoukhov(input):
    input = input.copy()
    output = np.zeros_like(input)

    coefficients = [
        (13, 0, 5, 18),
        (13, 0, 5, 18),
        (21, 0, 10, 31),
        (7, 0, 4, 11),
        (8, 0, 5, 13),
        (47, 3, 28, 78),
        (23, 3, 13, 39),
        (15, 3, 8, 26),
        (22, 6, 11, 39),
        (43, 15, 20, 78),
        (7, 3, 3, 13),
        (501, 224, 211, 936),
        (249, 116, 103, 468),
        (165, 80, 67, 312),
        (123, 62, 49, 234),
        (489, 256, 191, 936),
        (81, 44, 31, 156),
        (483, 272, 181, 936),
        (60, 35, 22, 117),
        (53, 32, 19, 104),
        (237, 148, 83, 468),
        (471, 304, 161, 936),
        (3, 2, 1, 6),
        (459, 304, 161, 924),
        (38, 25, 14, 77),
        (453, 296, 175, 924),
        (225, 146, 91, 462),
        (149, 96, 63, 308),
        (111, 71, 49, 231),
        (63, 40, 29, 132),
        (73, 46, 35, 154),
        (435, 272, 217, 924),
        (108, 67, 56, 231),
        (13, 8, 7, 28),
        (213, 130, 119, 462),
        (423, 256, 245, 924),
        (5, 3, 3, 11),
        (281, 173, 162, 616),
        (141, 89, 78, 308),
        (283, 183, 150, 616),
        (71, 47, 36, 154),
        (285, 193, 138, 616),
        (13, 9, 6, 28),
        (41, 29, 18, 88),
        (36, 26, 15, 77),
        (289, 213, 114, 616),
        (145, 109, 54, 308),
        (291, 223, 102, 616),
        (73, 57, 24, 154),
        (293, 233, 90, 616),
        (21, 17, 6, 44),
        (295, 243, 78, 616),
        (37, 31, 9, 77),
        (27, 23, 6, 56),
        (149, 129, 30, 308),
        (299, 263, 54, 616),
        (75, 67, 12, 154),
        (43, 39, 6, 88),
        (151, 139, 18, 308),
        (303, 283, 30, 616),
        (38, 36, 3, 77),
        (305, 293, 18, 616),
        (153, 149, 6, 308),
        (307, 303, 6, 616),
        (1, 1, 0, 2),
        (101, 105, 2, 208),
        (49, 53, 2, 104),
        (95, 107, 6, 208),
        (23, 27, 2, 52),
        (89, 109, 10, 208),
        (43, 55, 6, 104),
        (83, 111, 14, 208),
        (5, 7, 1, 13),
        (172, 181, 37, 390),
        (97, 76, 22, 195),
        (72, 41, 17, 130),
        (119, 47, 29, 195),
        (4, 1, 1, 6),
        (4, 1, 1, 6),
        (4, 1, 1, 6),
        (4, 1, 1, 6),
        (4, 1, 1, 6),
        (4, 1, 1, 6),
        (4, 1, 1, 6),
        (4, 1, 1, 6),
        (4, 1, 1, 6),
        (65, 18, 17, 100),
        (95, 29, 26, 150),
        (185, 62, 53, 300),
        (30, 11, 9, 50),
        (35, 14, 11, 60),
        (85, 37, 28, 150),
        (55, 26, 19, 100),
        (80, 41, 29, 150),
        (155, 86, 59, 300),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (5, 3, 2, 10),
        (305, 176, 119, 600),
        (155, 86, 59, 300),
        (105, 56, 39, 200),
        (80, 41, 29, 150),
        (65, 32, 23, 120),
        (55, 26, 19, 100),
        (335, 152, 113, 600),
        (85, 37, 28, 150),
        (115, 48, 37, 200),
        (35, 14, 11, 60),
        (355, 136, 109, 600),
        (30, 11, 9, 50),
        (365, 128, 107, 600),
        (185, 62, 53, 300),
        (25, 8, 7, 40),
        (95, 29, 26, 150),
        (385, 112, 103, 600),
        (65, 18, 17, 100),
        (395, 104, 101, 600),
        (4, 1, 1, 6),
    ]

    coefficients = [[x / 255 for x in t] for t in coefficients]

    coefficients_reversed = coefficients.copy()
    coefficients_reversed.reverse()
    coefficients = coefficients + coefficients_reversed

    left_to_right = True
    height, width = input.shape

    for y in range(height):
        if left_to_right:
            r = range(0, width, 1)
        else:
            r = range(width - 1, -1, -1)

        for x in r:
            old_pixel = input[y, x]
            new_pixel = 0.0 if old_pixel <= 0.5 else 1.0
            quantization_error = old_pixel - new_pixel
            output[y, x] = new_pixel

            directions = ((1, 0), (-1, 1), (0, 1))
            tmp = coefficients[int(old_pixel * 255.0)]
            intensity_coefficients = tmp[0:3]
            intensity_coefficients_sum = tmp[3]
            for (dx, dy), pixel_coefficient in zip(directions, intensity_coefficients):
                if not left_to_right:
                    dx *= -1

                xn, yn = x + dx, y + dy

                if (0 <= xn < width) and (0 <= yn < height):
                    new_value = (
                        input[yn, xn]
                        + pixel_coefficient
                        * quantization_error
                        / intensity_coefficients_sum
                    )
                    input[yn, xn] = (
                        0.0
                        if new_value <= 0.0
                        else 1.0
                        if new_value >= 1.0
                        else new_value
                    )

        if left_to_right and x >= (width - 1):
            left_to_right = False

        if not left_to_right and x <= 0:
            left_to_right = True

    return output
