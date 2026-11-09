import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MethodSection } from "@/components/MethodSection";
import { homeContent } from "@/content/home";

afterEach(cleanup);

describe("MethodSection", () => {
  it("renders a region named by its h2, with id metodo and scroll-mt-24", () => {
    render(<MethodSection method={homeContent.method} />);
    const region = screen.getByRole("region", { name: "Especificação antes do código" });
    expect(region).toHaveAttribute("id", "metodo");
    expect(region).toHaveClass("scroll-mt-24");
  });

  it("renders the eyebrow and a single h2 title", () => {
    render(<MethodSection method={homeContent.method} />);
    expect(screen.getByText("Método (SDD)")).toBeInTheDocument();
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s).toHaveLength(1);
    expect(h2s[0]).toHaveTextContent("Especificação antes do código");
  });

  it("renders the intro paragraph", () => {
    render(<MethodSection method={homeContent.method} />);
    expect(
      screen.getByText(
        "Eu decido, a IA executa, e cada PR passa por mim antes do merge. Esse é o ciclo do My Trello Version.",
      ),
    ).toBeInTheDocument();
  });

  it("renders six h3 steps in order", () => {
    render(<MethodSection method={homeContent.method} />);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    expect(h3s.map((h) => h.textContent)).toEqual([
      "Spec",
      "Design",
      "Tarefas",
      "Teste vermelho",
      "Código",
      "PR com revisão humana",
    ]);
  });

  it("renders the summary line and the link to the case", () => {
    render(<MethodSection method={homeContent.method} />);
    expect(
      screen.getByText("CI com checagens obrigatórias"),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver o método no My Trello Version" })).toHaveAttribute(
      "href",
      "/casos/my-trello-version",
    );
  });

  it("never renders '[conferir' in the HTML", () => {
    const { container } = render(<MethodSection method={homeContent.method} />);
    expect(container.innerHTML).not.toContain("[conferir");
  });

  it("holds no PT-BR literal in its source", () => {
    const source = readFileSync(join(process.cwd(), "src/components/MethodSection.tsx"), "utf8");
    expect(source).not.toMatch(/>\s*[A-Za-zÀ-ÿ][^<{]*</);
  });
});
