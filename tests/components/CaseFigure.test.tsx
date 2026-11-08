import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseFigure } from "@/components/CaseFigure";

afterEach(cleanup);

const figure = {
  src: "/my-trello-version-board.png",
  width: 1797,
  height: 915,
  alt: "Any board screenshot description",
  caption: "Any board caption",
};

describe("CaseFigure", () => {
  it("renders the image with its alt text", () => {
    render(<CaseFigure {...figure} />);

    expect(screen.getByRole("img", { name: figure.alt })).toBeInTheDocument();
  });

  it("renders the image with explicit width 1797 and height 915", () => {
    render(<CaseFigure {...figure} />);

    const image = screen.getByRole("img", { name: figure.alt });

    expect(image).toHaveAttribute("width", "1797");
    expect(image).toHaveAttribute("height", "915");
  });

  it("wraps the image in a figure whose figcaption holds the caption", () => {
    render(<CaseFigure {...figure} />);

    const wrapper = screen.getByRole("figure");

    expect(within(wrapper).getByRole("img", { name: figure.alt })).toBeInTheDocument();
    expect(wrapper.querySelector("figcaption")).toHaveTextContent(figure.caption);
  });
});
