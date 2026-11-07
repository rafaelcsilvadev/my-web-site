import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Page from "@/app/page";

afterEach(cleanup);

describe("Home page (FND-09, HOME-11)", () => {
  it("renders exactly one h1 with the hero headline", () => {
    render(<Page />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Especialista Full Stack");
  });

  it("renders the composed home view with main#conteudo", () => {
    render(<Page />);
    expect(screen.getByRole("main")).toHaveAttribute("id", "conteudo");
  });
});
