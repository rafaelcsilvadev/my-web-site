import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HomeView } from "@/components/HomeView";
import { homeContent } from "@/content/home";

afterEach(cleanup);

describe("HomeView", () => {
  it("wraps the page in div#top with the backdrop class", () => {
    const { container } = render(<HomeView content={homeContent} brand="Rafael Couto Silva" />);
    const top = container.querySelector("#top");
    expect(top).not.toBeNull();
    expect(top).toHaveClass("home-backdrop");
  });

  it("makes the skip link the first focusable element, targeting main#conteudo", () => {
    const { container } = render(<HomeView content={homeContent} brand="Rafael Couto Silva" />);
    const first = container.querySelector<HTMLElement>("a[href], button");
    expect(first).toHaveTextContent("Pular para o conteúdo");
    expect(first).toHaveAttribute("href", "#conteudo");
  });

  it("renders exactly one main landmark with id conteudo", () => {
    render(<HomeView content={homeContent} brand="Rafael Couto Silva" />);
    const mains = screen.getAllByRole("main");
    expect(mains).toHaveLength(1);
    expect(mains[0]).toHaveAttribute("id", "conteudo");
  });

  it("renders the header before main and the footer after it", () => {
    render(<HomeView content={homeContent} brand="Rafael Couto Silva" />);
    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    expect(header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("renders the sections in order: Hero, Projetos, Experiência, Stack, Método, Contato", () => {
    render(<HomeView content={homeContent} brand="Rafael Couto Silva" />);
    const main = screen.getByRole("main");
    const ids = Array.from(main.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual(["projetos", "experiencia", "stack", "metodo", "contato"]);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    const projects = main.querySelector("#projetos") as HTMLElement;
    expect(hero.compareDocumentPosition(projects) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("has one h1 and five h2, with h3 for cards, entries and steps", () => {
    render(<HomeView content={homeContent} brand="Rafael Couto Silva" />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(5);
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThan(0);
  });

  it("renders the hero headline and the contact heading", () => {
    render(<HomeView content={homeContent} brand="Rafael Couto Silva" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Especialista Full Stack");
    expect(screen.getByRole("heading", { level: 2, name: "Vamos conversar" })).toBeInTheDocument();
  });
});
