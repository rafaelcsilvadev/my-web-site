import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SkipLink } from "@/components/SkipLink";

afterEach(cleanup);

describe("SkipLink", () => {
  it("renders a link with the given label", () => {
    render(<SkipLink label="Any label" targetId="main" />);
    expect(screen.getByRole("link", { name: "Any label" })).toBeInTheDocument();
  });

  it("points the href to the target id", () => {
    render(<SkipLink label="Any label" targetId="conteudo" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "#conteudo");
  });

  it("is visually hidden until focused", () => {
    render(<SkipLink label="Any label" targetId="main" />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("sr-only");
    expect(link).toHaveClass("focus:not-sr-only");
  });
});
