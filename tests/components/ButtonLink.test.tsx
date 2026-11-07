import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ButtonLink } from "@/components/ButtonLink";

afterEach(cleanup);

const internal = { label: "Any label", href: "#contact" };
const external = { label: "Any external", href: "https://example.com", external: true };

describe("ButtonLink", () => {
  it("renders an internal link with href and no target or rel", () => {
    render(<ButtonLink link={internal} variant="primary" />);
    const anchor = screen.getByRole("link", { name: "Any label" });
    expect(anchor).toHaveAttribute("href", "#contact");
    expect(anchor).not.toHaveAttribute("target");
    expect(anchor).not.toHaveAttribute("rel");
  });

  it("opens an external link in a new tab with noopener noreferrer", () => {
    render(<ButtonLink link={external} variant="ghost" />);
    const anchor = screen.getByRole("link", { name: "Any external" });
    expect(anchor).toHaveAttribute("href", "https://example.com");
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("sets the download attribute when download is given", () => {
    render(<ButtonLink link={internal} variant="primary" download />);
    expect(screen.getByRole("link")).toHaveAttribute("download");
  });

  it("has no download attribute by default", () => {
    render(<ButtonLink link={internal} variant="primary" />);
    expect(screen.getByRole("link")).not.toHaveAttribute("download");
  });

  it("renders a decorative icon when given", () => {
    const { container } = render(<ButtonLink link={internal} variant="primary" icon="download" />);
    const svg = container.querySelector("a svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("renders no icon when none is given", () => {
    const { container } = render(<ButtonLink link={internal} variant="primary" />);
    expect(container.querySelector("svg")).toBeNull();
  });

  it("styles primary with bg-brand and ghost with a brand-text border", () => {
    const { rerender } = render(<ButtonLink link={internal} variant="primary" />);
    expect(screen.getByRole("link")).toHaveClass("bg-brand");
    rerender(<ButtonLink link={internal} variant="ghost" />);
    expect(screen.getByRole("link")).toHaveClass("border-brand-text/50");
    expect(screen.getByRole("link")).not.toHaveClass("bg-brand");
  });

  it("takes its text from props, not from hardcoded copy", () => {
    const source = readFileSync(join(process.cwd(), "src/components/ButtonLink.tsx"), "utf8");
    expect(source).not.toMatch(/>\s*[A-Za-zÀ-ÿ][^<{]*</);
    expect(source).not.toMatch(/["'`][^"'`]*[À-ÿ][^"'`]*["'`]/);
  });
});
