import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
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

function readSources(dir: string, extensions: string[]): { file: string; source: string }[] {
  const root = join(process.cwd(), dir);
  return readdirSync(root)
    .filter((file) => extensions.some((ext) => file.endsWith(ext)))
    .map((file) => ({ file, source: readFileSync(join(root, file), "utf8") }));
}

const componentSources = readSources("src/components", [".tsx"]);
const contentSources = readSources("src/content", [".ts"]);
const appSources = readSources("src/app", [".tsx"]);
const viewComponents = [
  ...componentSources.filter(({ file }) => file !== "HomeView.tsx"),
  ...appSources,
];

describe("Home page guards", () => {
  it("keeps PT-BR text out of JSX children in every component but HomeView", () => {
    const offenders = viewComponents.filter(({ source }) => />\s*[A-Za-z\u00C0-\u00FF][^<>{}]*</.test(source));
    expect(offenders.map(({ file }) => file)).toEqual([]);
  });

  it("keeps accented PT-BR string literals out of every component but HomeView", () => {
    const offenders = viewComponents.filter(({ source }) => /["'`][^"'`\n]*[\u00C0-\u00FF][^"'`\n]*["'`]/.test(source));
    expect(offenders.map(({ file }) => file)).toEqual([]);
  });

  it("never uses text-brand without a suffix (AD-001)", () => {
    const offenders = componentSources.filter(({ source }) => /(?<![\w-])text-brand(?![\w-])/.test(source));
    expect(offenders.map(({ file }) => file)).toEqual([]);
  });

  it("renders images only through next/image", () => {
    const offenders = componentSources.filter(({ source }) => /<img[\s>/]/.test(source));
    expect(offenders.map(({ file }) => file)).toEqual([]);
  });

  it("has no placeholder text in the content files", () => {
    const placeholder = /\[[A-Z\u00C0-\u00DA ]{3,}[^\]]*\]|\[conferir|SEU-DOMINIO|\bTODO\b|[Ll]orem ipsum/;
    const offenders = contentSources.filter(({ source }) => placeholder.test(source));
    expect(offenders.map(({ file }) => file)).toEqual([]);
  });

  it("sets no fixed width above 375 px in component class names", () => {
    const offenders = componentSources.filter(({ source }) =>
      Array.from(source.matchAll(/(?<![\w-])(?:min-)?w-(?:\[(\d+)px\]|(\d+)(?![\w./-]))/g)).some(
        ([, px, step]) => (px ? Number(px) : Number(step) * 4) > 375,
      ),
    );
    expect(offenders.map(({ file }) => file)).toEqual([]);
  });
});
