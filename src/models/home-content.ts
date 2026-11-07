export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface Metric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  context: string[];
  title: string;
  description: string;
  metrics: Metric[];
  tags: string[];
  caseLink: Link;
  repoLink?: Link;
}

export interface ExperienceEntry {
  company: string;
  period?: string;
  duration?: string;
  role: string;
  achievements: { lead?: string; text: string }[];
  tags: string[];
  note?: string;
  link?: Link;
}

export type ExperienceEntryView = ExperienceEntry;

export interface MethodStep {
  number: string;
  title: string;
  human: string;
  ai?: string;
  highlight?: boolean;
}

export interface MethodStepView extends Omit<MethodStep, "highlight"> {
  highlight: boolean;
}

export interface ContactCardItem {
  icon: "mail" | "linkedin" | "github" | "whatsapp";
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export interface HomeContent {
  chrome: {
    skipLinkLabel: string;
    mainId: string;
    topId: string;
    nav: { ariaLabel: string; links: { label: string; sectionId: string }[] };
    menuButton: { openLabel: string; closeLabel: string };
    footer: { copyright: string; backToTop: Link };
  };
  hero: {
    label: string;
    headline: string;
    badge: { label: string; text: string };
    intro: string;
    stackLine: string[];
    actions: { contact: Link; cv: Link };
    portrait: { src: string; width: number; height: number; alt: string; caption: string };
  };
  projects: { sectionId: string; eyebrow: string; title: string; items: ProjectItem[] };
  experience: { sectionId: string; eyebrow: string; title: string; entries: ExperienceEntry[] };
  stack: {
    sectionId: string;
    eyebrow: string;
    title: string;
    main: { name: string; note: string }[];
    otherLabel: string;
    others: string[];
  };
  method: {
    sectionId: string;
    eyebrow: string;
    title: string;
    intro: string;
    humanLabel: string;
    aiLabel: string;
    steps: MethodStep[];
    summary: string;
    link: Link;
  };
  contact: {
    sectionId: string;
    eyebrow: string;
    title: string;
    lead: string;
    cv: Link;
    whatsapp: Link;
    cards: ContactCardItem[];
  };
}
