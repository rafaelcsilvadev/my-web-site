import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MethodStep } from "@/components/MethodStep";
import type { MethodStep as MethodStepModel } from "@/models/home-content";

afterEach(cleanup);

const step: MethodStepModel = {
  number: "04",
  title: "Any Title",
  human: "Any human line.",
  ai: "Any AI line.",
};
const labels = { humanLabel: "Human", aiLabel: "AI" };

describe("MethodStep", () => {
  it("renders the number and the title as h3", () => {
    render(<MethodStep step={step} {...labels} />);
    expect(screen.getByText("04")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Any Title");
  });

  it("always renders the human row with its label", () => {
    render(<MethodStep step={{ ...step, ai: undefined }} {...labels} />);
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Any human line.")).toBeInTheDocument();
  });

  it("renders the AI row when text exists", () => {
    render(<MethodStep step={step} {...labels} />);
    expect(screen.getByText("AI")).toBeInTheDocument();
    expect(screen.getByText("Any AI line.")).toBeInTheDocument();
  });

  it.each([undefined, "", "   "])("renders no AI row when ai is %j", (ai) => {
    render(<MethodStep step={{ ...step, ai }} {...labels} />);
    expect(screen.queryByText("AI")).not.toBeInTheDocument();
  });

  it("adds the red-test style class when highlighted", () => {
    const { container } = render(<MethodStep step={{ ...step, highlight: true }} {...labels} />);
    expect(container.firstElementChild).toHaveClass("border-brand-text");
  });

  it("does not add the red-test style class by default", () => {
    const { container } = render(<MethodStep step={step} {...labels} />);
    expect(container.firstElementChild).not.toHaveClass("border-brand-text");
  });

  it("holds no PT-BR literal in its source", () => {
    const source = readFileSync(join(process.cwd(), "src/components/MethodStep.tsx"), "utf8");
    expect(source).not.toMatch(/>\s*[A-Za-zÀ-ÿ][^<{]*</);
  });
});
