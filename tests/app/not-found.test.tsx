import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import NotFound from "@/app/not-found";
import { siteContent } from "@/content/site";

afterEach(cleanup);

describe("Not-found page (FND-09, FND-07)", () => {
  it("shows the notFound title as the only h1", () => {
    render(<NotFound />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(siteContent.notFound.title);
  });

  it("links back to the home page", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: siteContent.notFound.backLabel });
    expect(link).toHaveAttribute("href", "/");
  });
});
