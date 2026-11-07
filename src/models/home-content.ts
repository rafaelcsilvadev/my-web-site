export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface Metric {
  label: string;
  value: string;
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
}
