import Link from "next/link";
import type { Link as LinkContent } from "@/models/home-content";
import { Icon } from "./Icon";

type BackLinkProps = {
  link: LinkContent;
};

export function BackLink({ link }: BackLinkProps) {
  return (
    <Link href={link.href} className="inline-flex items-center gap-2 underline">
      <Icon name="arrow" className="h-4 w-4 rotate-180" />
      {link.label}
    </Link>
  );
}
