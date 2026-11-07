import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";
import { homeContent } from "@/content/home";
import { siteContent } from "@/content/site";

const { chrome } = homeContent;
const HREFS = ["#projetos", "#experiencia", "#stack", "#metodo", "#contato"];

function setup() {
  return render(<SiteHeader brand={siteContent.name} chrome={chrome} />);
}

function menuButton() {
  return screen.getByRole("button", { name: /menu/i });
}

afterEach(cleanup);

describe("SiteHeader", () => {
  it("links the brand to #top", () => {
    setup();
    expect(screen.getByRole("link", { name: siteContent.name })).toHaveAttribute("href", "#top");
  });

  it("shows the five nav links with section hrefs", () => {
    setup();
    const nav = screen.getByRole("navigation", { name: chrome.nav.ariaLabel });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(HREFS);
    expect(links.map((a) => a.textContent)).toEqual(chrome.nav.links.map((l) => l.label));
  });

  it("hides the inline nav below md and the menu button from md up", () => {
    setup();
    const nav = screen.getByRole("navigation", { name: chrome.nav.ariaLabel });
    expect(nav).toHaveClass("hidden", "md:flex");
    expect(menuButton()).toHaveClass("md:hidden");
  });

  it("is sticky", () => {
    const { container } = setup();
    expect(container.querySelector("header")).toHaveClass("sticky");
  });

  it("starts closed with the open label and no panel", () => {
    setup();
    const button = menuButton();
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAccessibleName(chrome.menuButton.openLabel);
    expect(button.getAttribute("aria-controls")).toBeTruthy();
    expect(document.getElementById(button.getAttribute("aria-controls")!)).toBeNull();
  });

  it("opens the panel with five links when the button is clicked", () => {
    setup();
    const button = menuButton();
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName(chrome.menuButton.closeLabel);
    const panel = document.getElementById(button.getAttribute("aria-controls")!)!;
    const links = within(panel).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(HREFS);
  });

  it("closes when a panel link is clicked", () => {
    setup();
    const button = menuButton();
    fireEvent.click(button);
    const panel = document.getElementById(button.getAttribute("aria-controls")!)!;
    fireEvent.click(within(panel).getAllByRole("link")[0]);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById(button.getAttribute("aria-controls")!)).toBeNull();
  });

  it("closes on Escape", () => {
    setup();
    const button = menuButton();
    fireEvent.click(button);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
