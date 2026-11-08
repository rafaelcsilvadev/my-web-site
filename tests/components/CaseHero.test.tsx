import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseHero } from "@/components/CaseHero";
import type { CaseAction } from "@/models/case-content";

afterEach(cleanup);

const external: CaseAction = {
  link: { label: "Any external label", href: "https://example.com/repo", external: true },
  variant: "primary",
  icon: "github",
};
const internal: CaseAction = {
  link: { label: "Any internal label", href: "/somewhere" },
  variant: "ghost",
};

function renderHero(actions: CaseAction[]) {
  return render(
    <CaseHero
      eyebrow="Any eyebrow"
      title="Any title"
      intro="Any intro text"
      actions={actions}
    />,
  );
}

describe("CaseHero", () => {
  it("renders the eyebrow and the intro", () => {
    renderHero([]);
    expect(screen.getByText("Any eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Any intro text")).toBeInTheDocument();
  });

  it("renders exactly one h1 with the title", () => {
    renderHero([]);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Any title");
  });

  it("renders each action as a link with its href", () => {
    renderHero([external, internal]);
    expect(screen.getByRole("link", { name: "Any external label" })).toHaveAttribute(
      "href",
      "https://example.com/repo",
    );
    expect(screen.getByRole("link", { name: "Any internal label" })).toHaveAttribute(
      "href",
      "/somewhere",
    );
  });

  it("opens the external action in a new tab with noopener noreferrer", () => {
    renderHero([external, internal]);
    const link = screen.getByRole("link", { name: "Any external label" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Any internal label" })).not.toHaveAttribute(
      "target",
    );
  });

  it("renders no actions container and no links when actions is empty", () => {
    const { container } = renderHero([]);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(container.querySelector(":empty")).toBeNull();
  });
});
