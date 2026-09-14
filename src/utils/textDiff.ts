// Line-based text comparison used by the Text Diff tool. Unlike jsonDiff in
// devTools.ts, this compares raw text — no parsing — so it works on logs, CSV
// rows, config files, or any two strings.

export type DiffOp = 'equal' | 'add' | 'remove';

export interface DiffLine {
  op: DiffOp;
  /** 1-based line number in the original text; null when the line is only on the right. */
  leftNo: number | null;
  /** 1-based line number in the changed text; null when the line is only on the left. */
  rightNo: number | null;
  text: string;
}

export interface TextDiffOptions {
  ignoreCase?: boolean;
  /** Trims both ends and collapses runs of whitespace before comparing. */
  ignoreWhitespace?: boolean;
}

export interface TextDiffResult {
  lines: DiffLine[];
  added: number;
  removed: number;
  unchanged: number;
  /** True when nothing differs *under the chosen options*. */
  identical: boolean;
}

// The LCS table costs one Int32 per (left line x right line). Common prefix and
// suffix are trimmed before it is built, so this caps the differing middle
// rather than the whole input — but it still has to be capped, or a pair of
// large unrelated files would lock up the tab.
const MAX_MATRIX_CELLS = 4_000_000;

const splitLines = (text: string): string[] => text.replace(/\r\n?/g, '\n').split('\n');

const comparisonKey = (line: string, options: TextDiffOptions): string => {
  let key = line;
  if (options.ignoreWhitespace) key = key.trim().replace(/\s+/g, ' ');
  if (options.ignoreCase) key = key.toLowerCase();
  return key;
};

export function textDiff(
  leftText: string,
  rightText: string,
  options: TextDiffOptions = {},
): TextDiffResult {
  const leftLines = splitLines(leftText);
  const rightLines = splitLines(rightText);
  const leftKeys = leftLines.map((line) => comparisonKey(line, options));
  const rightKeys = rightLines.map((line) => comparisonKey(line, options));

  // Matching head and tail lines need no table — this is what keeps a one-line
  // change in a long file cheap.
  let prefix = 0;
  while (
    prefix < leftKeys.length &&
    prefix < rightKeys.length &&
    leftKeys[prefix] === rightKeys[prefix]
  ) {
    prefix++;
  }

  let suffix = 0;
  while (
    suffix < leftKeys.length - prefix &&
    suffix < rightKeys.length - prefix &&
    leftKeys[leftKeys.length - 1 - suffix] === rightKeys[rightKeys.length - 1 - suffix]
  ) {
    suffix++;
  }

  const leftMid = leftKeys.slice(prefix, leftKeys.length - suffix);
  const rightMid = rightKeys.slice(prefix, rightKeys.length - suffix);

  if (leftMid.length * rightMid.length > MAX_MATRIX_CELLS) {
    throw new Error(
      `These texts differ across too many lines to compare (${leftMid.length} x ${rightMid.length}). Try comparing smaller sections.`,
    );
  }

  // Longest common subsequence, filled from the end so the forward walk below
  // can pick the branch that keeps the most lines matched.
  const cols = rightMid.length + 1;
  const table = new Int32Array((leftMid.length + 1) * cols);
  for (let i = leftMid.length - 1; i >= 0; i--) {
    for (let j = rightMid.length - 1; j >= 0; j--) {
      table[i * cols + j] =
        leftMid[i] === rightMid[j]
          ? table[(i + 1) * cols + (j + 1)] + 1
          : Math.max(table[(i + 1) * cols + j], table[i * cols + (j + 1)]);
    }
  }

  const lines: DiffLine[] = [];
  let leftNo = 0;
  let rightNo = 0;

  const pushEqual = (text: string) =>
    lines.push({ op: 'equal', leftNo: ++leftNo, rightNo: ++rightNo, text });
  const pushRemove = (text: string) =>
    lines.push({ op: 'remove', leftNo: ++leftNo, rightNo: null, text });
  const pushAdd = (text: string) =>
    lines.push({ op: 'add', leftNo: null, rightNo: ++rightNo, text });

  for (let i = 0; i < prefix; i++) pushEqual(leftLines[i]);

  let i = 0;
  let j = 0;
  while (i < leftMid.length && j < rightMid.length) {
    if (leftMid[i] === rightMid[j]) {
      pushEqual(leftLines[prefix + i]);
      i++;
      j++;
    } else if (table[(i + 1) * cols + j] >= table[i * cols + (j + 1)]) {
      pushRemove(leftLines[prefix + i]);
      i++;
    } else {
      pushAdd(rightLines[prefix + j]);
      j++;
    }
  }
  while (i < leftMid.length) pushRemove(leftLines[prefix + i++]);
  while (j < rightMid.length) pushAdd(rightLines[prefix + j++]);

  for (let k = leftLines.length - suffix; k < leftLines.length; k++) pushEqual(leftLines[k]);

  let added = 0;
  let removed = 0;
  for (const line of lines) {
    if (line.op === 'add') added++;
    else if (line.op === 'remove') removed++;
  }

  return {
    lines,
    added,
    removed,
    unchanged: lines.length - added - removed,
    identical: added === 0 && removed === 0,
  };
}

/** Renders a result as a unified diff, for copying or downloading. */
export function toUnifiedText(result: TextDiffResult): string {
  const marker: Record<DiffOp, string> = { equal: ' ', add: '+', remove: '-' };
  return result.lines.map((line) => `${marker[line.op]} ${line.text}`).join('\n');
}

export type DiffRow =
  | { kind: 'line'; line: DiffLine }
  | { kind: 'gap'; count: number };

/**
 * Drops unchanged lines that are further than `context` lines from a change,
 * replacing each dropped run with a gap marker. Keeps a diff of a large file
 * readable — and keeps the rendered row count proportional to the changes
 * rather than to the input.
 */
export function collapseUnchanged(lines: DiffLine[], context = 2): DiffRow[] {
  const keep = new Array<boolean>(lines.length).fill(false);

  lines.forEach((line, index) => {
    if (line.op === 'equal') return;
    const from = Math.max(0, index - context);
    const to = Math.min(lines.length - 1, index + context);
    for (let i = from; i <= to; i++) keep[i] = true;
  });

  const rows: DiffRow[] = [];
  let skipped = 0;

  const flush = () => {
    if (skipped > 0) {
      rows.push({ kind: 'gap', count: skipped });
      skipped = 0;
    }
  };

  lines.forEach((line, index) => {
    if (keep[index]) {
      flush();
      rows.push({ kind: 'line', line });
    } else {
      skipped++;
    }
  });
  flush();

  return rows;
}
