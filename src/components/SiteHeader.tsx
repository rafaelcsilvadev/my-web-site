"use client";

import { Icon } from "@/components/Icon";
import type { HomeContent } from "@/models/home-content";
import { splitNavLinks } from "@/viewmodels/home-view-model";
import { useMobileMenu } from "@/viewmodels/use-mobile-menu";

type SiteHeaderProps = {
  brand: string;
  chrome: HomeContent["chrome"];
};

const PANEL_ID = "mobile-menu";
const LINK =
  "text-sm text-fg-muted transition-colors hover:text-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light";

export function SiteHeader({ brand, chrome }: SiteHeaderProps) {
  const { isOpen, toggle, close } = useMobileMenu();
  const { nav, menuButton, topId } = chrome;
  const { inlineLinks, cta } = splitNavLinks(nav);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center px-6 py-4 md:grid-cols-[1fr_auto_1fr]">
        <a
          href={`#${topId}`}
          className="flex items-center gap-2 font-mono text-sm font-semibold text-fg"
        >
          {brand}
          <span
            data-cursor
            aria-hidden="true"
            className="h-4 w-2 bg-brand-text"
          />
        </a>
        <nav
          aria-label={nav.ariaLabel}
          className="hidden items-center gap-8 md:flex"
        >
          {inlineLinks.map((link) => (
            <a
              key={link.sectionId}
              href={`#${link.sectionId}`}
              className={LINK}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 justify-self-end">
          {cta ? (
            <a
              href={`#${cta.sectionId}`}
              className="inline-flex min-h-10 items-center rounded-[10px] bg-brand px-4 text-sm font-bold text-white shadow-[inset_0_0_0_1px_rgb(227_181_240/0.28),0_8px_32px_-10px_rgb(136_30_155/0.8)] transition-colors hover:bg-brand-hover active:bg-brand-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
            >
              {cta.label}
            </a>
          ) : null}
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={PANEL_ID}
            aria-label={isOpen ? menuButton.closeLabel : menuButton.openLabel}
            onClick={toggle}
            className="rounded-[10px] border border-line p-2 text-fg md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
          >
            <Icon name={isOpen ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>
      {isOpen ? (
        <div id={PANEL_ID} className="border-t border-line px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {nav.links.map((link) => (
              <li key={link.sectionId}>
                <a href={`#${link.sectionId}`} className={LINK} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
