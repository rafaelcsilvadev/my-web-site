"use client";

import { Icon } from "@/components/Icon";
import type { HomeContent } from "@/models/home-content";
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

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href={`#${topId}`} className="font-semibold text-fg">
          {brand}
        </a>
        <nav aria-label={nav.ariaLabel} className="hidden items-center gap-6 md:flex">
          {nav.links.map((link) => (
            <a key={link.sectionId} href={`#${link.sectionId}`} className={LINK}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={PANEL_ID}
          aria-label={isOpen ? menuButton.closeLabel : menuButton.openLabel}
          onClick={toggle}
          className="rounded-md p-2 text-fg md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
        >
          <Icon name={isOpen ? "close" : "menu"} className="size-6" />
        </button>
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
