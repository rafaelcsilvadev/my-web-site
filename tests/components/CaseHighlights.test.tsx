import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseHighlights } from "@/components/CaseHighlights";

afterEach(cleanup);

const items = [
  { title: "Any first title", text: "Any first text" },
  { title: "Any second title", text: "Any second text" },
];

describe("CaseHighlights", () => {
  it("renders each highlight as a list item holding its title and text, in order", () => {
    render(<CaseHighlights items={items} />);

    const listItems = within(screen.getByRole("list")).getAllByRole("listitem");

    expect(listItems).toHaveLength(items.length);
    listItems.forEach((listItem, index) => {
      expect(within(listItem).getByText(items[index].title)).toBeInTheDocument();
      expect(within(listItem).getByText(items[index].text)).toBeInTheDocument();
    });
  });

  it("renders nothing when the highlight list is empty", () => {
    const { container } = render(<CaseHighlights items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
