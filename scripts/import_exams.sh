#!/usr/bin/env bash
# Copies every past-exam PDF into assets/past-exam/<year>-<key>/
# and renders the pages as PNGs (150 DPI). Idempotent.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="/home/abdulrahman/Desktop/a Zewail City2/4Y/Y4S2/CV/Lectures/Exams/CV Exams"
DEST="$ROOT/assets/past-exam"
DPI=150

import_pdf () {  # $1=src pdf, $2=dest subdir name, $3=basename inside
  local pdf="$1" sub="$2" base="$3"
  local out="$DEST/$sub"
  mkdir -p "$out"
  cp -n "$pdf" "$out/$base.pdf"
  echo "==> $sub/$base"
  pdftoppm -r "$DPI" -png "$out/$base.pdf" "$out/$base"
  # Pad page numbers to 3 digits for stable sort.
  pushd "$out" >/dev/null
  for f in "$base"-*.png; do
    n="${f#${base}-}"; n="${n%.png}"
    printf -v p "%03d" "$((10#$n))"
    [ "$f" != "${base}-${p}.png" ] && mv "$f" "${base}-${p}.png" || true
  done
  popd >/dev/null
}

# ---- Midterms ----
import_pdf "$SRC/CV Midterms/CV Mid 2018.pdf"               "2018-mid"  "midterm"
import_pdf "$SRC/CV Midterms/CV Mid 2019.pdf"               "2019-mid"  "midterm"
import_pdf "$SRC/CV Midterms/CV Mid 2023 .pdf"              "2023-mid"  "midterm"
import_pdf "$SRC/CV Midterms/CV Mid 2023_Answers .pdf"      "2023-mid"  "answers"
import_pdf "$SRC/CV Midterms/CV Mid 2024_Solution .pdf"     "2024-mid"  "solution"
import_pdf "$SRC/CV Midterms/CV-Midterm_2025.pdf"           "2025-mid"  "midterm"

# ---- Finals ----
import_pdf "$SRC/CV Finals/CV Final_18/CV_Final_2018 [SC].pdf"  "2018-final"  "final-sc"

import_pdf "$SRC/CV Finals/CV Final_19/CV_Final_2019 [SC].pdf"           "2019-final"  "final-sc"
import_pdf "$SRC/CV Finals/CV Final_19/CV_Final_2019 [CS].pdf"           "2019-final"  "final-cs"
import_pdf "$SRC/CV Finals/CV Final_19/[CV-Answers] Final_2019_SC.pdf"   "2019-final"  "answers-sc"

import_pdf "$SRC/CV Finals/CV Final_20/CV_Final_2020_Version_1 [SC].pdf"  "2020-final"  "final-v1"
import_pdf "$SRC/CV Finals/CV Final_20/CV_Final_2020_Version_2 [CS].pdf"  "2020-final"  "final-v2"
import_pdf "$SRC/CV Finals/CV Final_20/[CV-Answers] Final_2020_Sc.pdf"    "2020-final"  "answers-v1"

import_pdf "$SRC/CV Finals/CV Final_21/CV_Final_2021_Midterm&Final.pdf"          "2021-exam"  "midandfinal"
import_pdf "$SRC/CV Finals/CV Final_21/[CV-Answers] Final_2021_Midterm&Final.pdf" "2021-exam"  "answers"

import_pdf "$SRC/CV Finals/CV Finals_22/CV_Final_2022 [SC].pdf"               "2022-final"  "final-sc"
import_pdf "$SRC/CV Finals/CV Finals_22/CV_Final_2022 [Credit].pdf"           "2022-final"  "final-credit"
import_pdf "$SRC/CV Finals/CV Finals_22/[CV-Answers] Final_2022_Sc.pdf"       "2022-final"  "answers-sc"
import_pdf "$SRC/CV Finals/CV Finals_22/[CV-Answers] Final_2022_Credit.pdf"   "2022-final"  "answers-credit"

import_pdf "$SRC/CV Finals/CV Finals_23/CV_Final_2023 [SC-Csys _1st Term_].pdf"  "2023-final"  "final-sc"
import_pdf "$SRC/CV Finals/CV Finals_23/CV_Final_2023 [SC 2nd Term].pdf"         "2023-final"  "final-sc-2nd"
import_pdf "$SRC/CV Finals/CV Finals_23/[CV-Answers] Final_23_Sc&Csys _1st Term_.pdf"  "2023-final"  "answers-sc"
import_pdf "$SRC/CV Finals/CV Finals_23/CV Final_23 Credit/CV_Final_2023 [Credit].pdf"        "2023-final"  "final-credit"
import_pdf "$SRC/CV Finals/CV Finals_23/CV Final_23 Credit/[CV-Answers] Final_23_Credit.pdf"  "2023-final"  "answers-credit"

import_pdf "$SRC/CV Finals/CV Finals_24/CV_Final_2024 [SC-Csys].pdf"                              "2024-final"  "final-sc"
import_pdf "$SRC/CV Finals/CV Finals_24/CV-2024 Final Colored Version.pdf"                        "2024-final"  "final-colored"
import_pdf "$SRC/CV Finals/CV Finals_24/[CV-Solutions] Final_24_Sc&Csys by Yassin.pdf"            "2024-final"  "solutions-sc"
import_pdf "$SRC/CV Finals/CV Finals_24/CV Final_24 Credit/CV_Final_2024 [Credit].pdf"             "2024-final"  "final-credit"
import_pdf "$SRC/CV Finals/CV Finals_24/CV Final_24 Credit/Computer Vision 24 Credit Final [Solution].pdf"  "2024-final"  "solution-credit"

echo "All exam PDFs imported + rendered."
