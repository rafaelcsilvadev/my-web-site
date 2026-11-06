import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HomePlaceholder } from "@/components/HomePlaceholder";

afterEach(cleanup);

describe("HomePlaceholder", () => {
  it("renders exactly one h1 with the given title", () => {
    render(<HomePlaceholder title="Any Title" />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Any Title");
  });

  it("renders a main landmark", () => {
    render(<HomePlaceholder title="Any Title" />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("takes its text from props, not from hardcoded copy", () => {
    const { container } = render(<HomePlaceholder title="First" />);
    expect(container.textContent).toBe("First");
    const source = readFileSync(
      join(process.cwd(), "src/components/HomePlaceholder.tsx"),
      "utf8",
    );
    expect(source).not.toMatch(/>\s*[A-Za-zÀ-ÿ][^<{]*</);
  });
});
