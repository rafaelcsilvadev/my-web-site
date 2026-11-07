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
      className="flex items-center gap-4 rounded-2xl border border-line bg-linear-to-b from-card-from to-card-to p-5 transition-colors hover:border-brand-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
      {...externalProps}
    >
      <Icon name={icon} className="size-6 shrink-0 text-brand-light" />
      <span className="flex min-w-0 flex-col">
        <span className="font-mono text-xs uppercase text-fg-muted">{label}</span>
        <span className="truncate font-semibold text-fg">{value}</span>
      </span>
    </a>
  );
}
