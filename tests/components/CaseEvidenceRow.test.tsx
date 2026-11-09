import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseEvidenceRow } from "@/components/CaseEvidenceRow";

afterEach(cleanup);

const items = [
  { kind: "metric", value: "193", label: "commits" },
  {
    kind: "highlight",
    title: "Testes antes do código",
    text: "Any highlight text about tests.",
  },
  {
    kind: "highlight",
    title: "Gate único",
    text: "Any highlight text about the gate.",
  },
] as const;

describe("CaseEvidenceRow", () => {
  it("renders the metric and the two highlights as list items, in order", () => {
    render(<CaseEvidenceRow items={[...items]} />);

    const listItems = within(screen.getByRole("list")).getAllByRole("listitem");

    expect(listItems).toHaveLength(3);
    expect(within(listItems[0]).getByText("193")).toBeInTheDocument();
    expect(within(listItems[0]).getByText("commits")).toBeInTheDocument();
    expect(within(listItems[1]).getByText("Testes antes do código")).toBeInTheDocument();
    expect(within(listItems[1]).getByText(items[1].text)).toBeInTheDocument();
    expect(within(listItems[2]).getByText("Gate único")).toBeInTheDocument();
    expect(within(listItems[2]).getByText(items[2].text)).toBeInTheDocument();
  });

  it("shows the metric value before its label", () => {
    render(<CaseEvidenceRow items={[items[0]]} />);

    const value = screen.getByText("193");
    const label = screen.getByText("commits");

    expect(
      value.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("lays the cards out in one column on mobile and three from md", () => {
    render(<CaseEvidenceRow items={[...items]} />);

    const list = screen.getByRole("list");

    expect(list).toHaveClass("grid-cols-1");
    expect(list).toHaveClass("md:grid-cols-3");
  });

  it("renders nothing when the items list is empty", () => {
    const { container } = render(<CaseEvidenceRow items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
