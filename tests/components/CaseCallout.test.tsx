import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseCallout } from "@/components/CaseCallout";

afterEach(cleanup);

const items = ["Any first reason", "Any second reason", "Any third reason"];

describe("CaseCallout", () => {
  it("renders the label", () => {
    render(<CaseCallout label="Any callout label" items={items} />);

    expect(screen.getByText("Any callout label")).toBeInTheDocument();
  });

  it("renders each reason as a list item, in order", () => {
    render(<CaseCallout label="Any callout label" items={items} />);

    const listItems = within(screen.getByRole("list")).getAllByRole("listitem");

    expect(listItems.map((item) => item.textContent)).toEqual(items);
  });

  it("renders backtick-marked text in a monospace code element without the backticks", () => {
    render(<CaseCallout label="Any callout label" items={["Keep it in `any/path/` only"]} />);

    const code = screen.getByText("any/path/");

    expect(code.tagName).toBe("CODE");
    expect(code).toHaveClass("font-mono");
    expect(screen.getByRole("listitem").textContent).toBe("Keep it in any/path/ only");
  });

  it("renders an item without backticks with no code element", () => {
    const { container } = render(<CaseCallout label="Any callout label" items={items} />);

    expect(container.querySelector("code")).toBeNull();
  });

  it("renders nothing when the reasons list is empty", () => {
    const { container } = render(<CaseCallout label="Any callout label" items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
