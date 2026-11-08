import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseClosing } from "@/components/CaseClosing";
import type { CaseAction } from "@/models/case-content";

afterEach(cleanup);

const internal: CaseAction = {
  link: { label: "Any internal label", href: "/somewhere" },
  variant: "ghost",
  icon: "arrow",
};
const download: CaseAction = {
  link: { label: "Any download label", href: "/file.pdf" },
  variant: "ghost",
  icon: "download",
  download: true,
};
const external: CaseAction = {
  link: { label: "Any external label", href: "https://example.com/repo", external: true },
  variant: "primary",
  icon: "github",
};

function renderClosing(actions: CaseAction[]) {
  return render(
    <CaseClosing
      eyebrow="Any eyebrow"
      title="Any title"
      text="Any closing text"
      actions={actions}
    />,
  );
}

describe("CaseClosing", () => {
  it("renders the eyebrow and the text", () => {
    renderClosing([]);
    expect(screen.getByText("Any eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Any closing text")).toBeInTheDocument();
  });

  it("renders the title as an h2", () => {
    renderClosing([]);
    expect(screen.getByRole("heading", { level: 2, name: "Any title" })).toBeInTheDocument();
  });

  it("renders each action as a link with its href", () => {
    renderClosing([internal, download, external]);
    expect(screen.getByRole("link", { name: "Any internal label" })).toHaveAttribute(
      "href",
      "/somewhere",
    );
    expect(screen.getByRole("link", { name: "Any download label" })).toHaveAttribute(
      "href",
      "/file.pdf",
    );
    expect(screen.getByRole("link", { name: "Any external label" })).toHaveAttribute(
      "href",
      "https://example.com/repo",
    );
  });

  it("sets download only on the download action", () => {
    renderClosing([internal, download]);
    expect(screen.getByRole("link", { name: "Any download label" })).toHaveAttribute("download");
    expect(screen.getByRole("link", { name: "Any internal label" })).not.toHaveAttribute(
      "download",
    );
  });

  it("opens the external action in a new tab with noopener noreferrer", () => {
    renderClosing([internal, external]);
    const link = screen.getByRole("link", { name: "Any external label" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Any internal label" })).not.toHaveAttribute(
      "target",
    );
  });

  it("renders no actions container and no links when actions is empty", () => {
    const { container } = renderClosing([]);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(container.querySelector(":empty")).toBeNull();
  });
});
