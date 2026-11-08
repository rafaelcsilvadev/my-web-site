import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Icon, type IconName } from "@/components/Icon";

afterEach(cleanup);

const NAMES: IconName[] = [
  "download",
  "mail",
  "linkedin",
  "github",
  "youtube",
  "instagram",
  "whatsapp",
  "menu",
  "close",
  "arrow",
];

describe("Icon", () => {
  it.each(NAMES)("renders one decorative svg for %s", (name) => {
    const { container } = render(<Icon name={name} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveAttribute("aria-hidden", "true");
    expect(svgs[0]).toHaveAttribute("focusable", "false");
  });

  it("merges an optional className", () => {
    const { container } = render(<Icon name="mail" className="size-5 text-brand-text" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("size-5");
    expect(svg).toHaveClass("text-brand-text");
  });

  it("renders without a className", () => {
    const { container } = render(<Icon name="arrow" />);
    expect(container.querySelector("svg")).not.toHaveAttribute("class", "undefined");
  });

  it("uses the design stroke style: width 1.8 and round caps", () => {
    const { container } = render(<Icon name="download" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("stroke-width", "1.8");
    expect(svg).toHaveAttribute("stroke-linecap", "round");
    expect(svg).toHaveAttribute("stroke-linejoin", "round");
  });

  it("draws a different shape for each name", () => {
    const shapes = NAMES.map((name) => {
      const { container, unmount } = render(<Icon name={name} />);
      const html = container.querySelector("svg")!.innerHTML;
      unmount();
      return html;
    });
    expect(new Set(shapes).size).toBe(NAMES.length);
  });
});
