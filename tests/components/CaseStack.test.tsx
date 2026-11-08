import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseStack } from "@/components/CaseStack";
import type { CaseStack as CaseStackModel } from "@/models/case-content";

afterEach(cleanup);

const stack: CaseStackModel = {
  label: "Any stack label",
  groups: [
    { label: "Any base group", chips: ["Any base chip", "Any main base chip"], mainChips: ["Any main base chip"] },
    { label: "Any infra group", chips: ["Any infra chip"], mainChips: [] },
  ],
  note: "Any status note",
};

describe("CaseStack", () => {
  it("renders the stack label", () => {
    render(<CaseStack stack={stack} />);

    expect(screen.getByText("Any stack label")).toBeInTheDocument();
  });

  it("renders each labeled group as a list named by its label, with every chip in order", () => {
    render(<CaseStack stack={stack} />);

    const base = screen.getByRole("list", { name: "Any base group" });
    const infra = screen.getByRole("list", { name: "Any infra group" });

    expect(screen.getByText("Any base group")).toBeInTheDocument();
    expect(screen.getByText("Any infra group")).toBeInTheDocument();
    expect(within(base).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "Any base chip",
      "Any main base chip",
    ]);
    expect(within(infra).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "Any infra chip",
    ]);
  });

  it("marks only the main chips", () => {
    render(<CaseStack stack={stack} />);

    expect(screen.getByText("Any main base chip")).toHaveClass("bg-brand/15");
    expect(screen.getByText("Any base chip")).not.toHaveClass("bg-brand/15");
    expect(screen.getByText("Any infra chip")).not.toHaveClass("bg-brand/15");
  });

  it("renders a group without label as a list named by the stack label", () => {
    render(
      <CaseStack
        stack={{ label: "Any stack label", groups: [{ chips: ["Any chip"], mainChips: [] }] }}
      />,
    );

    const list = screen.getByRole("list", { name: "Any stack label" });

    expect(within(list).getByText("Any chip")).toBeInTheDocument();
  });

  it("renders the note when present and nothing for it when absent", () => {
    const { rerender } = render(<CaseStack stack={stack} />);

    expect(screen.getByText("Any status note")).toBeInTheDocument();

    rerender(<CaseStack stack={{ ...stack, note: undefined }} />);

    expect(screen.queryByText("Any status note")).not.toBeInTheDocument();
  });

  it("does not render a container for a group without chips", () => {
    render(
      <CaseStack
        stack={{
          label: "Any stack label",
          groups: [
            { label: "Any empty group", chips: [], mainChips: [] },
            { label: "Any filled group", chips: ["Any chip"], mainChips: [] },
          ],
        }}
      />,
    );

    expect(screen.queryByText("Any empty group")).not.toBeInTheDocument();
    expect(screen.getAllByRole("list")).toHaveLength(1);
  });
});
