import type { HomeContent } from "@/models/home-content";

type SiteFooterProps = {
  footer: HomeContent["chrome"]["footer"];
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="font-mono text-xs text-fg-muted">{footer.copyright}</p>
        <a
          href={footer.backToTop.href}
          className="text-sm text-brand-text underline underline-offset-4 transition-colors hover:text-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
        >
          {footer.backToTop.label}
        </a>
      </div>
    </footer>
  );
}
