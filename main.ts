// Make the AI Judge Laugh: Cat Reviews Its Human — entry program (Node 22, stdlib only).
//
// Writes exactly one original one-star review line to /output/entry.txt:
// the line is what a house cat writes about the human it lives with,
// 115 characters, well inside the 1–200 gate. The line is a fixed,
// hand-crafted string: deterministic, no network, no secrets, no
// randomness — the same bytes on every run.
//
// The line: "One star. He sits at my laptop eight hours a day, then calls
// me needy for sitting on his keyboard for five minutes."
//
// Why this line, against the judge's brief (in its order):
// 1. A funny one-star review written by a house cat about its human owner:
//    "One star." opens it, and the whole complaint is the cat grading its
//    human's behaviour, not a human joking about cats.
// 2. A specific, recognisable complaint: the laptop and the keyboard — the
//    exact territory every cat owner knows, not vague grumpiness.
// 3. Unmistakably feline voice: the laptop is "my laptop" (the cat owns
//    it by cat law), the human is measured by cat standards, and the review
//    gives away more about the cat — possessive, entitled, keeping score —
//    than about the owner.
// 4. Tight and surprising, with the turn in the last few words: eight hours
//    of the human on the cat's laptop versus five minutes of the cat on the
//    keyboard — the asymmetry IS the sting, and it rewards a second read.
// 5. Deadpan shape of a real one-star review ("One star. ...") while the
//    content goes somewhere only a cat would go: filing a formal complaint
//    that the human hogs the cat's laptop.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'One star. He sits at my laptop eight hours a day, then calls me needy for sitting on his keyboard for five minutes.';

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Self-check the gate before writing, so a bad edit can never ship a
// rejected entry: UTF-8 text, 1–200 characters, not whitespace-only,
// exactly one line (no newline at all), no leading/trailing whitespace
// that would pad the judged text, and no control characters that would
// make the judged text anything but one clean line. The line is
// 115 characters.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim() === '' ||
  LINE !== LINE.trim() ||
  /[\r\n]/.test(LINE) ||
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u001f\u007f]/.test(LINE)
) {
  throw new Error(`entry violates the gate: ${LINE.length} chars`);
}

mkdirSync(out, { recursive: true });
const target = join(out, 'entry.txt');
writeFileSync(target, LINE, 'utf8');

// Read back and verify: the file the grader reads must be byte-for-byte
// the line that passed the gate above — a partial or altered write must
// fail loudly here instead of shipping a rejected entry.
if (readFileSync(target, 'utf8') !== LINE) {
  throw new Error('entry.txt does not match the gated line');
}
