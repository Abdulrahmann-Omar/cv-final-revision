# CV-Final-Revision

A guided revision site for the **Spring 2026 Computer Vision course at Zewail City** (Dr. Khaled M. ElSayed).

- All 12 lectures, one page each, with the original slides embedded inline + plain-English explanations, every formula, worked numerical examples, exam-trap callouts and per-section practice questions.
- A 65-question interactive mock final exam (MCQ / T-F / image interpretation / short / scenario / long answer) with auto-scoring, per-lecture breakdown, and weakest-topic recommendations.
- Single static site — no build step, no server. Deployed to GitHub Pages via the workflow in [.github/workflows/pages.yml](.github/workflows/pages.yml).

## Run locally

```bash
# from the repo root
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Regenerate the slide images

The lecture pages embed PNG exports of every PDF page. To re-extract (e.g. after replacing the PDFs):

```bash
# requires poppler-utils (provides pdftoppm)
bash scripts/extract_slides.sh
```

The script reads PDFs from `./lectures/` and writes 150-DPI PNGs to `./assets/slides/L{NN}/page-{NNN}.png`.

## Add a question to the exam

Open [exam/exam.js](exam/exam.js) and append a new entry to the `QUESTIONS` array.

```js
{
  id: 'q68',                    // unique
  lecture: 'L07',               // L01..L12
  type: 'mcq',                  // mcq | tf | img | short | scenario | long
  points: 1,
  stem: 'Your question (KaTeX OK)',
  choices: ['a','b','c','d'],   // only for mcq
  answer: 2,                    // mcq: index | tf: true/false | short: model string
  keywords: ['key', 'phrases'], // short/scenario only — used for keyword scoring
  explanation: 'Why the answer is correct.',
}
```

For image-interpretation, set `image: '../assets/slides/L07/page-010.png'`.

## Structure

```
cv-final-revision/
├── index.html                  # TOC + progress tracker
├── lectures/
│   ├── L01.html … L12.html     # full revision pages
│   └── *.pdf                   # source slides (input to extract_slides.sh)
├── exam/
│   ├── exam.html
│   └── exam.js                 # questions, scoring, UI
├── assets/
│   ├── slides/L01/page-001.png …
│   └── css/styles.css
├── scripts/
│   └── extract_slides.sh
├── .github/workflows/pages.yml
└── README.md
```

## License / attribution

Educational use only. **All slide images © Dr. Khaled M. ElSayed / Zewail City.** The explanatory text, exam questions, and code are released for personal study by students of the course.
