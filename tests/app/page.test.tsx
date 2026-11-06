import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Page from "@/app/page";
import { siteContent } from "@/content/site";

afterEach(cleanup);

describe("Home page (FND-09)", () => {
  it("renders exactly one h1 with the site name", () => {
    render(<Page />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(siteContent.name);
  });
});
