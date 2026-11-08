import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BackLink } from "@/components/BackLink";

afterEach(cleanup);

const link = { label: "Any back label", href: "/" };

describe("BackLink", () => {
  it("renders a link named by the label that points to href", () => {
    render(<BackLink link={link} />);
    expect(screen.getByRole("link", { name: "Any back label" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders an icon hidden from assistive tech", () => {
    render(<BackLink link={link} />);
    const icon = screen.getByRole("link").querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
