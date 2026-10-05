# Image source register

This register records the provenance of service photography used on the website. Generated AVIF and WebP files are stored in `public/images/services/`; the source files themselves are not published.

## Service imagery

| Service | Source | Creator / ownership | Licence or permission basis |
| --- | --- | --- | --- |
| Concreting | `public/images/projects/plain-concrete-slab-installation/cover-*` | Genuine Geli Construction Services project photography supplied by the business | Business-supplied project photography approved for this website |
| Excavation | [Industrial Excavator Digging at Construction Site](https://www.pexels.com/photo/industrial-excavator-digging-at-construction-site-34422183/) | Nadtochiy Photography | [Pexels licence](https://www.pexels.com/license/) |
| Stonework & Outdoor Tiling | `IMG_7704(1).webp`, supplied directly by the website owner on 24 September 2026 | User-supplied image; public source and creator not supplied | Use requested by the website owner; retain the original permission/source record outside the public website |
| Outdoor Finishing & Landscaping | [Assorted Plants with Trees Photography](https://www.pexels.com/photo/assorted-plants-with-trees-photography-7283/) | Creative Vix | [Pexels licence](https://www.pexels.com/license/) |
| Irrigation & Drainage | [Water Sprinkler on the Grass](https://www.pexels.com/photo/water-sprinkler-on-the-grass-8443729/) | Animesh Srivastava | [Pexels licence](https://www.pexels.com/license/) |
| Retaining Walls | `IMG_7705(1).jpeg`, supplied directly by the website owner on 24 September 2026 | User-supplied image; public source and creator not supplied | Use requested by the website owner; retain the original permission/source record outside the public website |

## Rejected images

`IMG_7690.jpeg`, `IMG_7692.jpeg` and `IMG_7693.jpeg` are explicitly rejected. They must not be copied into the repository, processed into derivatives or referenced by the website.

## Project photography update — 5 October 2026

The project galleries for multi-unit residential concreting, residential driveways and crossovers, coloured concrete driveways and paths, and exposed aggregate driveways, steps and entries use genuine Geli Construction Services photography supplied by the business in the shared `Job 1` through `Job 10` folders. Only optimized AVIF and WebP derivatives are published; the supplied JPEG files remain outside the repository.

Job 7 and the loose root-level images were not used. Other unused job photographs were omitted because they duplicated stronger views, contained a photographer shadow that could not be cropped naturally, or showed more site clutter than the selected alternatives.

## Processing

Published derivatives are auto-oriented, cropped where specified, resized without enlargement, and encoded through Sharp. The processing pipeline does not copy EXIF, IPTC or XMP metadata into generated output files.
