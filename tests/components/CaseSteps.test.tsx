import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseSteps } from "@/components/CaseSteps";

afterEach(cleanup);

const items = [
  { number: "01", title: "Any first title", caption: "Any first caption" },
  { number: "02", title: "Any second title", caption: "Any second caption" },
  { number: "03", title: "Any third title", caption: "Any third caption" },
  { number: "04", title: "Any fourth title", caption: "Any fourth caption", highlight: true },
  { number: "05", title: "Any fifth title", caption: "Any fifth caption" },
  { number: "06", title: "Any sixth title", caption: "Any sixth caption" },
];

describe("CaseSteps", () => {
  it("renders an ordered list with one item per step, in order, with number, title and caption", () => {
    render(<CaseSteps items={items} />);

    const listItems = within(screen.getByRole("list")).getAllByRole("listitem");

    expect(screen.getByRole("list").tagName).toBe("OL");
    expect(listItems).toHaveLength(6);
    listItems.forEach((listItem, index) => {
      expect(within(listItem).getByText(items[index].number)).toBeInTheDocument();
      expect(within(listItem).getByText(items[index].title)).toBeInTheDocument();
      expect(within(listItem).getByText(items[index].caption)).toBeInTheDocument();
    });
  });

  it("applies the highlight class only to the step marked highlight", () => {
    render(<CaseSteps items={items} />);

    const listItems = screen.getAllByRole("listitem");

    listItems.forEach((listItem, index) => {
      if (items[index].highlight) {
        expect(listItem).toHaveClass("bg-brand/15");
      } else {
        expect(listItem).not.toHaveClass("bg-brand/15");
      }
    });
  });

  it("renders nothing when the step list is empty", () => {
    const { container } = render(<CaseSteps items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
