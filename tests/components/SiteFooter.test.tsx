import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/SiteFooter";
import { homeContent } from "@/content/home";

const { footer } = homeContent.chrome;

afterEach(cleanup);

describe("SiteFooter", () => {
  it("renders a contentinfo landmark", () => {
    render(<SiteFooter footer={footer} />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the copyright text", () => {
    render(<SiteFooter footer={footer} />);
    expect(screen.getByText("© 2026 Rafael Couto Silva")).toBeInTheDocument();
  });

  it("renders the back-to-top link pointing to #top", () => {
    render(<SiteFooter footer={footer} />);
    expect(screen.getByRole("link", { name: "Voltar ao topo" })).toHaveAttribute("href", "#top");
  });

  it("renders text from props, not hardcoded", () => {
    render(<SiteFooter footer={{ copyright: "Any text", backToTop: { label: "Up", href: "#x" } }} />);
    expect(screen.getByText("Any text")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Up" })).toHaveAttribute("href", "#x");
  });
});
