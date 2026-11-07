import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ContactCard } from "@/components/ContactCard";

afterEach(cleanup);

describe("ContactCard", () => {
  it("renders the label and the value", () => {
    render(<ContactCard icon="mail" label="Any label" value="any@value.test" href="mailto:any@value.test" />);
    expect(screen.getByText("Any label")).toBeInTheDocument();
    expect(screen.getByText("any@value.test")).toBeInTheDocument();
  });

  it("renders a link with the given href", () => {
    render(<ContactCard icon="mail" label="Any label" value="any@value.test" href="mailto:any@value.test" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "mailto:any@value.test");
  });

  it("opens an external card in a new tab with noopener noreferrer", () => {
    render(<ContactCard icon="github" label="Any label" value="Any value" href="https://example.com" external />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has neither target nor rel when not external", () => {
    render(<ContactCard icon="mail" label="Any label" value="Any value" href="mailto:any@value.test" />);
    const anchor = screen.getByRole("link");
    expect(anchor).not.toHaveAttribute("target");
    expect(anchor).not.toHaveAttribute("rel");
  });

  it("renders a decorative icon", () => {
    const { container } = render(<ContactCard icon="linkedin" label="Any label" value="Any value" href="https://example.com" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
