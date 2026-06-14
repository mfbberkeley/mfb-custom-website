#!/usr/bin/env python3
"""Batch-process team headshots to consistent 3:4 portrait webp files."""

from __future__ import annotations

import os
import re
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "Headshot (this will be on the website) (File responses)"
OUTPUT_DIR = ROOT / "images" / "team"

# Match admin cropper output: 3:4 portrait, max 1200x1600
TARGET_W = 1200
TARGET_H = 1600
ASPECT = 3 / 4

# Filename suffix after " - " maps to output slug
SLUG_MAP = {
    "Alizeh Fatima Ali": "alizeh-ali",
    "Micah F Shin": "micah-shin",
    "Nathan Jun-Liang Nyaung": "nathan-nyaung",
    "Elliot Jang": "elliot-jang",
    "Nidhish Anand Tekkam": "nidhish-tekkam",
    "Willie Kang": "willie-kang",
    "Kellen Patrick Chang": "kellen-chang",
    "Nicole Wang": "nicole-wang",
    "Susie T. Gu": "susie-gu",
    "Susie Gu": "susie-gu",
    "Palak Prabhakar": "palak-prabhakar",
    "Mihiro Mei Okubo": "mihiro-okubo",
    "Arthur Matthieu Renard": "arthur-renard",
    "Harpreet Kaur": "harpreet-kaur",
    "Yingyi Zhen": "yingyi-zhen",
    "Alexander Seth Black": "alex-black",
    "Chris Alexis Reyes": "christian-reyes",
    "Jolene Ly Seng": "jolene-seng",
    "Alex Kwan": "alexander-kwan",
    "Matthew Chan": "matthew-chan",
    "Lauren Antonia Davis": "lauren-davis",
    "Maeve M Klement": "maeve-klement",
    "Nithyashree Prabhu": "nithyashree-prabhu",
    "Hean Ng": "hean-ng",
    "Rayhan Jain": "rayhan-jain",
    "Orin Dhruvan": "orin-dhruvan",
    "Yoshan Uvan Murugesh": "yoshan-murugesh",
    "Katherine Chloe Rivas": "katherine-rivas",
    "Akhila Nagasai Lankalapalli": "akhila-lankalapalli",
    "Athena Sia": "athena-sia",
    "Rubin Adi Jain": "rubin-jain",
    "Andy Cai": "andy-cai",
}
FACE_CASCADE = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

# Per-person crop tuning: face_ratio↑ = zoom in, offset_x↑ = shift subject right,
# face_y_ratio↑ = move crop down (more face visible when cut off at top).
CROP_OVERRIDES: dict[str, dict[str, float]] = {
    "katherine-rivas": {
        "manual_center": (0.50, 0.50),
        "crop_height_frac": 1.0,
        "face_y_ratio": 0.50,
    },
    "orin-dhruvan": {
        "manual_center": (0.50, 0.38),
        "crop_height_frac": 0.35,
        "face_y_ratio": 0.34,
    },
    "rayhan-jain": {"face_ratio": 0.30, "offset_x": 0.03},
    "nidhish-tekkam": {"face_ratio": 0.27, "offset_x": 0.03},
    "willie-kang": {"manual_center": (0.50, 0.36), "crop_height_frac": 0.48, "face_y_ratio": 0.34},
    "alex-black": {"manual_center": (0.50, 0.42), "crop_height_frac": 0.76, "face_y_ratio": 0.38},
}


def slug_from_filename(path: Path) -> str | None:
    name = path.stem
    if " - " in name:
        person = name.rsplit(" - ", 1)[-1].strip()
        if person in SLUG_MAP:
            return SLUG_MAP[person]

    # Fallback: trailing segment after last " - "
    for key, slug in SLUG_MAP.items():
        if name.endswith(key) or key in name:
            return slug

    # Special cases without " - "
    specials = {
        "DSC08626 Willie Kang": "willie-kang",
        "DSC08876 Andy Cai": "andy-cai",
        "DSC08578 Orin Dhruvan": "orin-dhruvan",
        "DSC08492 Hean Ng": "hean-ng",
    }
    return specials.get(name)


def pil_to_cv(img: Image.Image) -> np.ndarray:
    if img.mode != "RGB":
        img = img.convert("RGB")
    return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)


def pick_face(bgr: np.ndarray, overrides: dict | None = None):
    overrides = overrides or {}
    anchor = overrides.get("anchor")
    if anchor is not None:
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
        faces = FACE_CASCADE.detectMultiScale(
            gray, scaleFactor=1.05, minNeighbors=3, minSize=(60, 60)
        )
        if len(faces) == 0:
            return None
        h, w = bgr.shape[:2]
        ax, ay = anchor

        def distance(face):
            cx = (face[0] + face[2] / 2) / w
            cy = (face[1] + face[3] / 2) / h
            return ((cx - ax) ** 2 + (cy - ay) ** 2) ** 0.5

        return min(faces, key=distance)

    return detect_face(bgr)


def detect_face(bgr: np.ndarray):
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    faces = FACE_CASCADE.detectMultiScale(
        gray, scaleFactor=1.08, minNeighbors=4, minSize=(80, 80)
    )
    if len(faces) == 0:
        return None

    h, w = bgr.shape[:2]
    centered = [
        f for f in faces
        if 0.12 < (f[0] + f[2] / 2) / w < 0.88
        and 0.30 < (f[1] + f[3] / 2) / h < 0.58
    ]
    candidates = centered if centered else list(faces)

    def score(face):
        fx, fy, fw, fh = face
        cx = (fx + fw / 2) / w
        cy = (fy + fh / 2) / h
        area = fw * fh
        center_score = 1 - min(abs(cx - 0.5) * 2.2, 1)
        vertical_score = 1 - min(abs(cy - 0.42) * 2.8, 1)
        return area * (0.35 + 0.4 * center_score + 0.25 * vertical_score)

    return max(candidates, key=score)


def compute_crop_box(
    w: int,
    h: int,
    face=None,
    overrides: dict[str, float] | None = None,
) -> tuple[int, int, int, int]:
    overrides = overrides or {}
    desired_face_ratio = overrides.get("face_ratio", 0.22)
    face_y_ratio = overrides.get("face_y_ratio", 0.38)
    offset_x = overrides.get("offset_x", 0.0)
    manual_center = overrides.get("manual_center")

    crop_h = h
    crop_w = int(round(crop_h * ASPECT))

    if crop_w > w:
        crop_w = w
        crop_h = int(round(crop_w / ASPECT))

    if manual_center is not None:
        cx_frac, cy_frac = manual_center
        crop_h = int(round(h * overrides.get("crop_height_frac", 0.70)))
        crop_w = int(round(crop_h * ASPECT))
        crop_w = min(crop_w, w)
        crop_h = min(int(round(crop_w / ASPECT)), h)
        left = int(round(cx_frac * w - crop_w / 2 + offset_x * crop_w))
        top = int(round(cy_frac * h - crop_h * face_y_ratio))
    elif face is not None:
        fx, fy, fw, fh = face
        face_cx = fx + fw / 2
        face_cy = fy + fh / 2

        crop_h = int(round(fh / desired_face_ratio))
        crop_w = int(round(crop_h * ASPECT))

        crop_h = min(crop_h, h)
        crop_w = min(crop_w, w)
        if crop_w / crop_h > ASPECT:
            crop_w = int(round(crop_h * ASPECT))
        else:
            crop_h = int(round(crop_w / ASPECT))

        left = int(round(face_cx - crop_w / 2 + offset_x * crop_w))
        top = int(round(face_cy - crop_h * face_y_ratio))
    else:
        left = int(round((w - crop_w) / 2 + offset_x * crop_w))
        top = int(round((h - crop_h) * 0.32))

    left = max(0, min(left, w - crop_w))
    top = max(0, min(top, h - crop_h))
    return left, top, left + crop_w, top + crop_h


def process_image(src: Path, slug: str) -> None:
    img = Image.open(src)
    img = ImageOps_exif_transpose(img)
    w, h = img.size
    bgr = pil_to_cv(img)
    overrides = CROP_OVERRIDES.get(slug)
    face = pick_face(bgr, overrides)
    box = compute_crop_box(w, h, face, overrides)
    cropped = img.crop(box)
    cropped = cropped.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

    out = OUTPUT_DIR / f"{slug}.webp"
    cropped.save(out, "WEBP", quality=88, method=6)
    mode = "face" if face is not None else "center"
    print(f"OK  {slug}.webp  ({mode}, from {src.name})")


def ImageOps_exif_transpose(img: Image.Image) -> Image.Image:
    try:
        from PIL import ImageOps

        return ImageOps.exif_transpose(img)
    except Exception:
        return img


def main():
    import sys

    only = None
    if len(sys.argv) > 1:
        only = {s.strip() for s in sys.argv[1].split(",")}

    if not SOURCE_DIR.is_dir():
        raise SystemExit(f"Source folder not found: {SOURCE_DIR}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    files = sorted(
        f
        for f in SOURCE_DIR.iterdir()
        if f.is_file() and f.suffix.lower() in {".jpg", ".jpeg", ".png", ".heic", ".webp"}
    )

    seen_slugs: dict[str, Path] = {}
    for src in files:
        slug = slug_from_filename(src)
        if not slug:
            print(f"SKIP (no slug): {src.name}")
            continue
        if slug in seen_slugs:
            print(f"WARN duplicate slug {slug}: keeping {seen_slugs[slug].name}, skipping {src.name}")
            continue
        seen_slugs[slug] = src

    print(f"Processing {len(seen_slugs)} headshots -> {OUTPUT_DIR}\n")
    for slug, src in sorted(seen_slugs.items()):
        if only and slug not in only:
            continue
        process_image(src, slug)

    print(f"\nDone. {len(seen_slugs)} images written.")


if __name__ == "__main__":
    main()
