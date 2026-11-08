import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseCardList } from "@/components/CaseCardList";

afterEach(cleanup);

const items = [
  { label: "Any first label", text: "Any first text" },
  { label: "Any second label", text: "Any second text" },
  { label: "Any third label", text: "Any third text" },
];

describe("CaseCardList", () => {
  it("renders each card as a list item holding its label and text, in order", () => {
    render(<CaseCardList items={items} />);

    const listItems = within(screen.getByRole("list")).getAllByRole("listitem");

    expect(listItems).toHaveLength(items.length);
    listItems.forEach((listItem, index) => {
      expect(within(listItem).getByText(items[index].label)).toBeInTheDocument();
      expect(within(listItem).getByText(items[index].text)).toBeInTheDocument();
    });
  });

  it("stacks cards in a single full-width column at every breakpoint", () => {
    render(<CaseCardList items={items} />);

    const list = screen.getByRole("list");

    expect(list).toHaveClass("grid-cols-1");
    expect(list.className).not.toMatch(/(?:md|lg|xl):grid-cols-/);
  });

  it("renders nothing when the card list is empty", () => {
    const { container } = render(<CaseCardList items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
