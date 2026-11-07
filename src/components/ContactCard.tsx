import { Icon, type IconName } from "@/components/Icon";

type ContactCardProps = {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export function ContactCard({ icon, label, value, href, external }: ContactCardProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a
      href={href}
      className="flex items-center gap-3.5 rounded-xl border border-line bg-white/[0.03] px-4 py-3.5 transition-colors hover:border-brand-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
      {...externalProps}
    >
      <Icon name={icon} className="size-4 shrink-0 text-brand-light" />
      <span className="flex min-w-0 flex-col">
        <span className="font-semibold text-fg">{label}</span>
        <span className="truncate font-mono text-xs text-fg-muted">{value}</span>
      </span>
    </a>
  );
}
