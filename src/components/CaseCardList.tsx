type CaseCardListProps = {
  items: { label: string; text: string }[];
};

export function CaseCardList({ items }: CaseCardListProps) {
  if (items.length === 0) return null;

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0">
      {items.map(({ label, text }) => (
        <li
          key={label}
          className="flex flex-col gap-2 rounded-xl border border-line bg-linear-to-b from-card-from to-card-to p-5"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-brand-text">{label}</span>
          <span className="text-sm leading-relaxed text-fg-muted">{text}</span>
        </li>
      ))}
    </ul>
  );
}
