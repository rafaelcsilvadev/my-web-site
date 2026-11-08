import type { Fact } from "@/models/case-content";

type CaseFactsProps = {
  facts: Fact[];
};

export function CaseFacts({ facts }: CaseFactsProps) {
  if (facts.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-[1160px] px-[clamp(16px,5vw,48px)]">
      <dl className="m-0 grid grid-cols-1 gap-5 rounded-xl border border-line bg-white/[0.02] px-6 py-5 sm:grid-cols-3 sm:gap-8">
        {facts.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <dt className="font-mono text-xs text-fg-muted">{label}</dt>
            <dd className="m-0 text-base font-bold text-fg">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
