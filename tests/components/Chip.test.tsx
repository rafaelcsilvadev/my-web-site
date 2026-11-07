import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Chip } from "@/components/Chip";

afterEach(cleanup);

describe("Chip", () => {
  it("renders the label text", () => {
    render(<Chip label="Any label" />);
    expect(screen.getByText("Any label")).toBeInTheDocument();
  });

  it("adds the brand border only in the main variant", () => {
    const { rerender } = render(<Chip label="Any label" />);
    expect(screen.getByText("Any label")).not.toHaveClass("border-brand-text");
    rerender(<Chip label="Any label" main />);
    expect(screen.getByText("Any label")).toHaveClass("border-brand-text", "bg-brand/15");
  });

  it("is a rounded rectangle, not a pill", () => {
    render(<Chip label="Any label" />);
    expect(screen.getByText("Any label")).toHaveClass("rounded-md");
    expect(screen.getByText("Any label")).not.toHaveClass("rounded-full");
  });
});
