import type {
  ExperienceEntry,
  ExperienceEntryView,
  MethodStep,
  MethodStepView,
} from "@/models/home-content";

export function toExperienceEntryView(entry: ExperienceEntry): ExperienceEntryView {
  return { ...entry, period: entry.period?.trim() || undefined };
}

export function toMethodStepView(step: MethodStep): MethodStepView {
  return { ...step, ai: step.ai?.trim() || undefined, highlight: step.highlight ?? false };
}

export function hasItems<T>(list: readonly T[] | undefined): list is T[] {
  return list !== undefined && list.length > 0;
}

type NavLink = { label: string; sectionId: string };

export function splitNavLinks(nav: { ctaSectionId: string; links: NavLink[] }): {
  inlineLinks: NavLink[];
  cta: NavLink | undefined;
} {
  return {
    inlineLinks: nav.links.filter((link) => link.sectionId !== nav.ctaSectionId),
    cta: nav.links.find((link) => link.sectionId === nav.ctaSectionId),
  };
}
