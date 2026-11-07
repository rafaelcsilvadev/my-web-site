type ChipProps = {
  label: string;
  main?: boolean;
};

const BASE =
  "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs";

export function Chip({ label, main }: ChipProps) {
  const variant = main
    ? "border-brand-text text-brand-light"
    : "border-line text-fg-muted";

  return <span className={`${BASE} ${variant}`}>{label}</span>;
}
