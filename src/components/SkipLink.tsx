type SkipLinkProps = {
  label: string;
  targetId: string;
};

export function SkipLink({ label, targetId }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-text focus:px-4 focus:py-2 focus:text-sm"
    >
      {label}
    </a>
  );
}
