type CaseCalloutProps = {
  label: string;
  items: string[];
};

export function CaseCallout({ label, items }: CaseCalloutProps) {
  if (items.length === 0) return null;

  return (
    <div className="card-glow rounded-xl border border-line bg-linear-to-b from-card-from to-card-to p-6">
      <p className="font-mono text-[11px] uppercase tracking-wider text-brand-text">{label}</p>
      <ul className="m-0 mt-4 list-none divide-y divide-line p-0">
        {items.map((item) => (
          <li key={item} className="py-3 text-base text-fg-muted first:pt-0 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
