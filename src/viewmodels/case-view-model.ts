export function findCase<T extends { slug: string }>(
  cases: readonly T[],
  slug: string,
): T | undefined {
  return cases.find((entry) => entry.slug === slug);
}
