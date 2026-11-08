import type { Fact } from "@/models/case-content";

type CaseFactsProps = {
  facts: Fact[];
};

export function CaseFacts({ facts }: CaseFactsProps) {
  if (facts.length === 0) return null;

  return (
    <dl className="mx-auto grid w-full max-w-[1160px] grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
      {facts.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-1.5 bg-linear-to-b from-card-from to-card-to p-6">
          <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">{label}</dt>
          <dd className="m-0 text-base font-bold text-fg">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
