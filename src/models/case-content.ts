import type { Link, Metric } from "./home-content";

export type Fact = Metric;

export interface CaseAction {
  link: Link;
  variant: "primary" | "ghost";
  icon?: "arrow" | "download" | "github";
  download?: boolean;
}

export type EvidenceItem =
  | { kind: "metric"; value: string; label: string }
  | { kind: "highlight"; title: string; text: string };

export type CaseBlock =
  | { kind: "paragraphs"; items: string[] }
  | { kind: "callout"; label: string; items: string[] }
  | { kind: "metrics"; items: Metric[] }
  | { kind: "cards"; items: { label: string; text: string }[] }
  | {
      kind: "steps";
      items: { number: string; title: string; caption: string; highlight?: boolean }[];
    }
  | { kind: "highlights"; items: { title: string; text: string }[] }
  | { kind: "evidence"; items: EvidenceItem[] }
  | {
      kind: "figure";
      src: string;
      width: number;
      height: number;
      alt: string;
      caption: string;
    };

export interface CaseSection {
  id: string;
  number: string;
  title: string;
  layout: "split" | "stacked";
  intro?: string;
  blocks: CaseBlock[];
}

export interface CaseStackGroup {
  label?: string;
  chips: string[];
  mainChips: string[];
}

export interface CaseStack {
  label: string;
  groups: CaseStackGroup[];
  note?: string;
}

export interface CaseClosing {
  eyebrow: string;
  title: string;
  text: string;
  actions: CaseAction[];
}

export interface CaseContent {
  slug: string;
  metadata: { title: string; description: string };
  backLink: Link;
  eyebrow: string;
  title: string;
  intro: string;
  heroActions: CaseAction[];
  facts: Fact[];
  sections: CaseSection[];
  stack: CaseStack;
  closing: CaseClosing;
}
