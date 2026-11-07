import type { ExperienceEntry, ExperienceEntryView } from "@/models/home-content";

export function toExperienceEntryView(entry: ExperienceEntry): ExperienceEntryView {
  return { ...entry, period: entry.period?.trim() || undefined };
}

export function hasItems<T>(list: readonly T[] | undefined): list is T[] {
  return list !== undefined && list.length > 0;
}
