type ChipProps = {
  label: string;
  main?: boolean;
};

const BASE =
  "inline-flex items-center rounded-md border px-3 py-1 font-mono text-xs";

export function Chip({ label, main }: ChipProps) {
  const variant = main
    ? "border-brand-text bg-brand/15 text-brand-light"
    : "border-line text-fg-muted";

  return <span className={`${BASE} ${variant}`}>{label}</span>;
}
