import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SectionHeading } from "@/components/SectionHeading";

afterEach(cleanup);

describe("SectionHeading", () => {
  it("hides the number from assistive tech and shows the label", () => {
    render(<SectionHeading eyebrow="01 · Destaques" title="Projetos" id="projetos" />);
    const number = screen.getByText("01");
    expect(number).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Destaques")).not.toHaveAttribute("aria-hidden");
  });

  it("renders the h2 with the given id and title", () => {
    render(<SectionHeading eyebrow="01 · Destaques" title="Projetos" id="projetos" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Projetos" });
    expect(heading).toHaveAttribute("id", "projetos");
  });

  it("renders an eyebrow without separator fully visible, with no aria-hidden span", () => {
    const { container } = render(<SectionHeading eyebrow="Destaques" title="Projetos" id="p" />);
    expect(screen.getByText("Destaques")).toBeVisible();
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it("splits only on the first separator", () => {
    render(<SectionHeading eyebrow="02 · A · B" title="T" id="t" />);
    expect(screen.getByText("02")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText(/A · B/)).toBeInTheDocument();
  });
});
