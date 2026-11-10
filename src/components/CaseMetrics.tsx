import type { Metric } from "@/models/home-content";

type CaseMetricsProps = {
  items: Metric[];
};

export function CaseMetrics({ items }: CaseMetricsProps) {
  if (items.length === 0) return null;

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr">
      {items.map(({ value, label }) => (
        <li
          key={label}
          className="card-glow flex flex-col gap-1 rounded-xl border border-line bg-linear-to-b from-card-from to-card-to p-5"
        >
          <span className="whitespace-nowrap font-mono text-2xl font-bold text-brand-light">{value}</span>
          <span className="text-xs text-fg-muted">{label}</span>
        </li>
      ))}
    </ul>
  );
}
