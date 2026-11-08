import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseSection } from "@/components/CaseSection";

afterEach(cleanup);

const base = {
  id: "any-section",
  number: "01",
  title: "Any section title",
};

describe("CaseSection", () => {
  it("renders a section labelled by its h2 title", () => {
    render(
      <CaseSection {...base} layout="stacked">
        <p>Any child</p>
      </CaseSection>,
    );

    const heading = screen.getByRole("heading", { level: 2, name: "Any section title" });
    const section = screen.getByRole("region", { name: "Any section title" });

    expect(section.tagName).toBe("SECTION");
    expect(section).toHaveAttribute("aria-labelledby", heading.id);
    expect(section).toHaveAttribute("id", "any-section");
  });

  it("renders the number badge hidden from assistive tech", () => {
    render(
      <CaseSection {...base} layout="stacked">
        <p>Any child</p>
      </CaseSection>,
    );

    const badge = screen.getByText("01");

    expect(badge).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the intro only when provided", () => {
    const { rerender } = render(
      <CaseSection {...base} layout="stacked" intro="Any intro text">
        <p>Any child</p>
      </CaseSection>,
    );

    expect(screen.getByText("Any intro text")).toBeInTheDocument();

    rerender(
      <CaseSection {...base} layout="stacked">
        <p>Any child</p>
      </CaseSection>,
    );

    expect(screen.queryByText("Any intro text")).not.toBeInTheDocument();
  });

  it("renders its children", () => {
    render(
      <CaseSection {...base} layout="split">
        <p>Any child content</p>
      </CaseSection>,
    );

    expect(screen.getByText("Any child content")).toBeInTheDocument();
  });

  it("uses a different layout class for split and stacked", () => {
    const { container, rerender } = render(
      <CaseSection {...base} layout="split">
        <p>Any child</p>
      </CaseSection>,
    );
    const splitClass = container.querySelector("section > div")?.className;

    rerender(
      <CaseSection {...base} layout="stacked">
        <p>Any child</p>
      </CaseSection>,
    );
    const stackedClass = container.querySelector("section > div")?.className;

    expect(splitClass).toContain("lg:grid-cols-");
    expect(stackedClass).not.toContain("lg:grid-cols-");
  });
});
