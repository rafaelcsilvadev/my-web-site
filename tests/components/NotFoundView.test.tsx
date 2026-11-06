import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NotFoundView } from "@/components/NotFoundView";

afterEach(cleanup);

const props = {
  title: "Any Title",
  message: "Any message text",
  backLabel: "Any back label",
};

describe("NotFoundView", () => {
  it("shows the title in an h1", () => {
    render(<NotFoundView {...props} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Any Title",
    );
  });

  it("shows the message", () => {
    render(<NotFoundView {...props} />);
    expect(screen.getByText("Any message text")).toBeInTheDocument();
  });

  it("renders a link to / with the back label", () => {
    render(<NotFoundView {...props} />);
    const link = screen.getByRole("link", { name: "Any back label" });
    expect(link).toHaveAttribute("href", "/");
  });
});
