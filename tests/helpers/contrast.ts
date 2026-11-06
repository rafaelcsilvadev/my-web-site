function channelToLinear(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) {
    throw new Error(`Expected a 6-digit hex color, got "${hex}"`);
  }
  const [r, g, b] = match.slice(1).map((part) => channelToLinear(parseInt(part, 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.1 contrast ratio between two 6-digit hex colors. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [lighter, darker] = a >= b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

/** Reads the `--color-*` declarations from the `@theme { ... }` block of a CSS source. */
export function readThemeTokens(css: string): Record<string, string> {
  const block = /@theme\s*\{([^}]*)\}/.exec(css);
  const tokens: Record<string, string> = {};
  if (!block) return tokens;
  for (const [, name, value] of block[1].matchAll(/(--color-[\w-]+)\s*:\s*([^;]+);/g)) {
    tokens[name] = value.trim();
  }
  return tokens;
}
