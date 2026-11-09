export type InlineSegment = { text: string; code: boolean };

export function splitInlineCode(input: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const parts = input.split("`");
  // An even part count means an odd number of backticks: the last one is unmatched.
  const hasUnmatched = parts.length % 2 === 0;
  const matched = hasUnmatched ? parts.slice(0, -2) : parts;
  const tail = hasUnmatched ? `\`${parts[parts.length - 1]}` : "";

  matched.forEach((text, index) => {
    if (text) segments.push({ text, code: index % 2 === 1 });
  });

  if (hasUnmatched) {
    const last = segments[segments.length - 1];
    const lead = parts[parts.length - 2];
    // parts[length-2] is plain text that precedes the unmatched backtick.
    if (last && !last.code) last.text += lead + tail;
    else segments.push({ text: lead + tail, code: false });
  }

  return segments;
}
