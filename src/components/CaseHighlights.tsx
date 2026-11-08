type CaseHighlightsProps = {
  items: { title: string; text: string }[];
};

export function CaseHighlights({ items }: CaseHighlightsProps) {
  if (items.length === 0) return null;

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
      {items.map(({ title, text }) => (
        <li
          key={title}
          className="flex flex-col gap-2 rounded-xl border border-line bg-linear-to-b from-card-from to-card-to p-5"
        >
          <span className="text-base font-bold text-fg">{title}</span>
          <span className="text-sm leading-relaxed text-fg-muted">{text}</span>
        </li>
      ))}
    </ul>
  );
}
