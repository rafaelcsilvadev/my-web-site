import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { StackSection } from "@/components/StackSection";
import { homeContent } from "@/content/home";

afterEach(cleanup);

describe("StackSection", () => {
  it("renders a region named by its h2, with id stack and scroll-mt-24", () => {
    render(<StackSection stack={homeContent.stack} />);
    const region = screen.getByRole("region", { name: "Onde sou mais forte" });
    expect(region).toHaveAttribute("id", "stack");
    expect(region).toHaveClass("scroll-mt-24");
  });

  it("renders the eyebrow label and a single h2 title", () => {
    render(<StackSection stack={homeContent.stack} />);
    expect(screen.getByText("Stack")).toBeInTheDocument();
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s).toHaveLength(1);
    expect(h2s[0]).toHaveTextContent("Onde sou mais forte");
  });

  it("renders three main chips, each with the 'fio principal' label", () => {
    render(<StackSection stack={homeContent.stack} />);
    for (const name of ["TypeScript", "React", "Node"]) {
      expect(screen.getByText(name)).toHaveClass("text-brand-light");
    }
    expect(screen.getAllByText("fio principal")).toHaveLength(3);
  });

  it("lays the main items out as a three-column grid of cards", () => {
    render(<StackSection stack={homeContent.stack} />);
    const card = screen.getByText("TypeScript").closest("li");
    expect(card?.parentElement).toHaveClass("grid", "md:grid-cols-3", "max-w-[820px]");
    expect(card).toHaveClass("rounded-xl", "border", "border-line", "bg-linear-to-b", "p-6");
  });

  it("renders the nine secondary chips after the 'também já trabalhei com' label", () => {
    render(<StackSection stack={homeContent.stack} />);
    expect(screen.getByText("também já trabalhei com")).toBeInTheDocument();
    const list = screen.getByRole("list", { name: "também já trabalhei com" });
    const items = screen.getAllByRole("listitem").filter((li) => list.contains(li));
    expect(items.map((li) => li.textContent)).toEqual([
      "Next.js",
      "React Native",
      "Flutter",
      "Laravel",
      "Vue.js",
      "AdonisJS",
      ".NET",
      "Angular",
      "SQL Server",
    ]);
  });

  it("renders no secondary container when others is empty", () => {
    render(<StackSection stack={{ ...homeContent.stack, others: [] }} />);
    expect(screen.queryByText("também já trabalhei com")).not.toBeInTheDocument();
    expect(screen.queryByRole("list", { name: "também já trabalhei com" })).not.toBeInTheDocument();
  });

  it("holds no PT-BR literal in its source", () => {
    const source = readFileSync(join(process.cwd(), "src/components/StackSection.tsx"), "utf8");
    expect(source).not.toMatch(/>\s*[A-Za-zÀ-ÿ][^<{]*</);
  });
});
