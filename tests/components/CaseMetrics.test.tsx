import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseMetrics } from "@/components/CaseMetrics";

afterEach(cleanup);

const items = [
  { value: "Any first value", label: "Any first label" },
  { value: "Any second value", label: "Any second label" },
  { value: "Any third value", label: "Any third label" },
];

describe("CaseMetrics", () => {
  it("renders each metric as a list item holding its value and label, in order", () => {
    render(<CaseMetrics items={items} />);

    const listItems = within(screen.getByRole("list")).getAllByRole("listitem");

    expect(listItems).toHaveLength(items.length);
    listItems.forEach((listItem, index) => {
      expect(within(listItem).getByText(items[index].value)).toBeInTheDocument();
      expect(within(listItem).getByText(items[index].label)).toBeInTheDocument();
    });
  });

  it("renders nothing when the metrics list is empty", () => {
    const { container } = render(<CaseMetrics items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
