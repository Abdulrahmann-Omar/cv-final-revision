#!/usr/bin/env bash
# Exports every page of every lecture PDF as a 150 DPI PNG into
# ./assets/slides/L{NN}/page-{NNN}.png — used by the lecture pages.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PDF_DIR="$ROOT/lectures"
OUT_DIR="$ROOT/assets/slides"
DPI=150

# Map lecture number -> PDF filename prefix (everything before the trailing .pdf)
declare -A PDFS=(
  [01]="[01] Intro to CV - Image Enhancement in Spatial Domain-2026"
  [02]="[02] Filters - Freq Domain-SP 2026+Notes"
  [03]="[03] Image Morphology-2026+Notes"
  [04]="[04] SIFT  Image Feature-Sp 2026+Notes"
  [05]="[05] object detection-sliding window-SP 2026+Notes"
  [06]="[06] IoU - NMS+Notes"
  [07]="[07] YOLO-Sp 2026+Notes"
  [08]="[08] YOLO Loss Function-Sp 2026+Notes"
  [09]="[09] Landmark Detection - RCNN Fast RCNN - Faster RCNN-Sp 2026+notes"
  [10]="[10] Region Proposal Network (RPN)-Sp 2026+Notes"
  [11]="[11] Faster RCNN -  ROI Pooling - ROI Align - Dectector  (The complete Picture)+Notes"
  [12]="[12] Faster RCNN  Detector - Mask RCNN+ Notes+ Bonus delivery"
)

for N in $(echo "${!PDFS[@]}" | tr ' ' '\n' | sort); do
  PREFIX="${PDFS[$N]}"
  PDF="$PDF_DIR/${PREFIX}.pdf"
  DEST="$OUT_DIR/L${N}"
  mkdir -p "$DEST"
  if [[ ! -f "$PDF" ]]; then
    echo "MISSING: $PDF" >&2
    continue
  fi
  echo "==> L${N}  ($PREFIX)"
  pdftoppm -r "$DPI" -png "$PDF" "$DEST/page" -f 1
  # pdftoppm writes page-1.png ... page-N.png — pad to 3 digits for stable sorts
  pushd "$DEST" >/dev/null
  for f in page-*.png; do
    num="${f#page-}"; num="${num%.png}"
    printf -v padded "%03d" "$((10#$num))"
    if [[ "$f" != "page-${padded}.png" ]]; then
      mv "$f" "page-${padded}.png"
    fi
  done
  popd >/dev/null
  echo "    extracted $(ls "$DEST" | wc -l) pages"
done

echo "Done. Slides written to $OUT_DIR"
