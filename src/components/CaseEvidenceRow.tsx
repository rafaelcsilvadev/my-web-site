import type { EvidenceItem } from "@/models/case-content";

type CaseEvidenceRowProps = {
  items: readonly EvidenceItem[];
};

const CARD_CLASS =
  "card-glow flex flex-col gap-2 rounded-xl border border-line bg-linear-to-b from-card-from to-card-to p-5";

export function CaseEvidenceRow({ items }: CaseEvidenceRowProps) {
  if (items.length === 0) return null;

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
      {items.map((item) => {
        if (item.kind === "metric") {
          return (
            <li key={item.label} className={CARD_CLASS}>
              <span className="font-mono text-2xl font-bold text-brand-light">{item.value}</span>
              <span className="text-xs text-fg-muted">{item.label}</span>
            </li>
          );
        }
        return (
          <li key={item.title} className={CARD_CLASS}>
            <span className="text-base font-bold text-fg">{item.title}</span>
            <span className="text-sm leading-relaxed text-fg-muted">{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
