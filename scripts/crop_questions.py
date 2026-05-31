#!/usr/bin/env python3
"""Crop each question from the per-page renders of the Spring 25 exam PDF.

Coordinates were chosen by visually inspecting the renders (pages are
1275×1650 at 150 DPI from US-letter, with ~110-pixel margins at top/bottom).
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "past-exam"
OUT = ROOT / "assets" / "past-exam" / "q"
OUT.mkdir(parents=True, exist_ok=True)

# (output filename, source page, (left, top, right, bottom))
# We keep the full page width and crop vertically so the question is presented
# in context (matrices/tables remain legible).
CROPS = [
    # ---- Midterm
    ("m-q1.png", "page-002.png", (60, 250, 1215, 970)),
    ("m-q2.png", "page-002.png", (60, 970, 1215, 1560)),
    ("m-q3.png", "page-003.png", (60, 130, 1215, 870)),
    ("m-q4.png", "page-003.png", (60, 870, 1215, 1600)),   # Q4 header + image + 1st part
    ("m-q4-tail.png", "page-004.png", (60, 130, 1215, 1100)),
    ("m-q5.png", "page-004.png", (60, 1100, 1215, 1610)),

    # ---- Final
    ("f-q1.png", "page-006.png", (60, 130, 1215, 580)),
    ("f-q2.png", "page-006.png", (60, 580, 1215, 880)),
    ("f-q3.png", "page-006.png", (60, 880, 1215, 1100)),
    ("f-q4.png", "page-006.png", (60, 1100, 1215, 1330)),
    ("f-q5.png", "page-006.png", (60, 1330, 1215, 1600)),
    ("f-q5-tail.png", "page-007.png", (60, 130, 1215, 570)),
    ("f-q6.png", "page-007.png", (60, 570, 1215, 970)),
    ("f-q7.png", "page-007.png", (60, 970, 1215, 1560)),
    ("f-q8.png", "page-008.png", (60, 130, 1215, 940)),
]

for name, page, box in CROPS:
    src = SRC / page
    if not src.exists():
        print(f"MISSING source page: {src}", flush=True)
        continue
    im = Image.open(src)
    cropped = im.crop(box)
    cropped.save(OUT / name, optimize=True)
    print(f"  wrote {name}  ({cropped.size[0]}×{cropped.size[1]})")

print(f"Done. {len(CROPS)} crops written to {OUT}")
