import { Icon, type IconName } from "@/components/Icon";
import type { Link } from "@/models/home-content";

type ButtonLinkProps = {
  link: Link;
  variant: "primary" | "ghost";
  icon?: IconName;
  download?: boolean;
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[10px] px-6 text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light";

const VARIANTS: Record<ButtonLinkProps["variant"], string> = {
  primary:
    "bg-brand text-white shadow-[inset_0_0_0_1px_rgb(227_181_240/0.28),0_8px_32px_-10px_rgb(136_30_155/0.8)] hover:bg-brand-hover active:bg-brand-pressed",
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
      {icon ? <Icon name={icon} className="size-[18px]" /> : null}
      {link.label}
    </a>
  );
}
