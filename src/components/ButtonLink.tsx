import { Icon, type IconName } from "@/components/Icon";
import type { Link } from "@/models/home-content";

type ButtonLinkProps = {
  link: Link;
  variant: "primary" | "ghost";
  icon?: IconName;
  download?: boolean;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light";

const VARIANTS: Record<ButtonLinkProps["variant"], string> = {
  primary: "bg-brand text-fg hover:bg-brand-hover active:bg-brand-pressed",
  ghost: "border border-brand-text/50 text-brand-light hover:border-brand-text hover:bg-brand/10",
};

export function ButtonLink({ link, variant, icon, download }: ButtonLinkProps) {
  const externalProps = link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={link.href}
      className={`${BASE} ${VARIANTS[variant]}`}
      download={download ? true : undefined}
      {...externalProps}
    >
      {icon ? <Icon name={icon} className="size-5" /> : null}
      {link.label}
    </a>
  );
}
