type CaseStep = { number: string; title: string; caption: string; highlight?: boolean };

type CaseStepsProps = {
  items: CaseStep[];
};

const BASE = "flex flex-col gap-2.5 rounded-lg border p-4";

export function CaseSteps({ items }: CaseStepsProps) {
  if (items.length === 0) return null;

  return (
    <ol className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-3 lg:grid-cols-6">
      {items.map(({ number, title, caption, highlight }) => {
        const tone = highlight
          ? "border-brand-text/40 bg-brand/15"
          : "border-line bg-card-from";

        return (
          <li key={number} className={`${BASE} ${tone}`}>
            <span className="font-mono text-[11px] text-brand-text">{number}</span>
            <span className="text-[15px] font-semibold text-fg">{title}</span>
            <span className="text-[13px] leading-snug text-fg-muted">{caption}</span>
          </li>
        );
      })}
    </ol>
  );
}
