import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseView } from "@/components/CaseView";
import { caseChrome } from "@/content/case-chrome";
import { cases } from "@/content/cases";
import type { CaseContent } from "@/models/case-content";

afterEach(cleanup);

const BRAND = "Rafael Couto Silva";

function renderCase(content: CaseContent) {
  return render(<CaseView content={content} chrome={caseChrome} brand={BRAND} />);
}

describe.each(cases.map((entry) => [entry.slug, entry] as const))("CaseView %s", (_slug, content) => {
  it("renders exactly one h1 with the case title", () => {
    renderCase(content);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(content.title);
  });

  it("renders the numbered h2 sections in content order before the closing h2", () => {
    renderCase(content);
    const main = screen.getByRole("main");
    const sectionTitles = Array.from(main.querySelectorAll("section[id] h2")).map((h2) => h2.textContent);
    expect(sectionTitles).toEqual(content.sections.map((section) => section.title));
    expect(content.sections).toHaveLength(3);
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s).toHaveLength(content.sections.length + 1);
    expect(h2s[h2s.length - 1]).toHaveTextContent(content.closing.title);
  });

  it("renders every block kind present in the content", () => {
    renderCase(content);
    const main = screen.getByRole("main");
    for (const section of content.sections) {
      const root = main.querySelector<HTMLElement>(`#${section.id}`) as HTMLElement;
      for (const block of section.blocks) {
        if (block.kind === "paragraphs") {
          for (const text of block.items) expect(within(root).getByText(text)).toBeInTheDocument();
        } else if (block.kind === "callout") {
          expect(within(root).getByText(block.label)).toBeInTheDocument();
        } else if (block.kind === "metrics") {
          for (const { label } of block.items) expect(within(root).getByText(label)).toBeInTheDocument();
        } else if (block.kind === "cards") {
          for (const { label } of block.items) expect(within(root).getByText(label)).toBeInTheDocument();
        } else if (block.kind === "steps") {
          for (const { title } of block.items) expect(within(root).getByText(title)).toBeInTheDocument();
        } else if (block.kind === "highlights") {
          for (const { title } of block.items) expect(within(root).getByText(title)).toBeInTheDocument();
        } else if (block.kind === "figure") {
          expect(within(root).getByRole("img", { name: block.alt })).toBeInTheDocument();
          expect(within(root).getByText(block.caption)).toBeInTheDocument();
        }
      }
    }
  });

  it("renders the back link, facts, stack label and closing", () => {
    renderCase(content);
    expect(screen.getByRole("link", { name: content.backLink.label })).toHaveAttribute(
      "href",
      content.backLink.href,
    );
    const main = within(screen.getByRole("main"));
    for (const { label } of content.facts) expect(main.getByText(label)).toBeInTheDocument();
    expect(main.getByText(content.stack.label)).toBeInTheDocument();
    expect(main.getByText(content.closing.text)).toBeInTheDocument();
  });

  it("leaves no [conferir marker in the rendered page", () => {
    const { container } = renderCase(content);
    expect(container.textContent).not.toContain("[conferir");
  });

  it("wraps the page in div#top with the skip link as first focusable element targeting main", () => {
    const { container } = renderCase(content);
    expect(container.querySelector("#top")).not.toBeNull();
    const first = container.querySelector<HTMLElement>("a[href], button");
    expect(first).toHaveTextContent(caseChrome.skipLinkLabel);
    expect(first).toHaveAttribute("href", `#${caseChrome.mainId}`);
    expect(screen.getByRole("main")).toHaveAttribute("id", caseChrome.mainId);
  });

  it("places header before main and footer after it", () => {
    renderCase(content);
    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");
    expect(header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("takes the header hrefs from the case chrome", () => {
    renderCase(content);
    const header = screen.getByRole("banner");
    for (const link of caseChrome.nav.links) {
      const href = link.href as string;
      const anchors = within(header).getAllByRole("link", { name: link.label });
      expect(anchors.some((anchor) => anchor.getAttribute("href") === href)).toBe(true);
    }
    expect(within(header).getByRole("link", { name: new RegExp(BRAND) })).toHaveAttribute(
      "href",
      caseChrome.brandHref,
    );
  });
});

describe("Case view guards", () => {
  it("keeps PT-BR text out of Case*.tsx and BackLink.tsx", () => {
    const dir = join(process.cwd(), "src/components");
    const files = readdirSync(dir).filter((file) => /^(Case.*|BackLink)\.tsx$/.test(file));
    expect(files).toContain("CaseView.tsx");
    const offenders = files.filter((file) => {
      const source = readFileSync(join(dir, file), "utf8");
      return (
        />\s*[A-Za-zÀ-ÿ][^<>{}]*</.test(source) ||
        /["'`][^"'`\n]*[À-ÿ][^"'`\n]*["'`]/.test(source)
      );
    });
    expect(offenders).toEqual([]);
  });
});

describe("Case view evidence block", () => {
  it("renders the three evidence cards inside the section that holds the block", () => {
    const base = cases[0];
    const content: CaseContent = {
      ...base,
      sections: base.sections.map((section, index) =>
        index === 0
          ? {
              ...section,
              blocks: [
                ...section.blocks,
                {
                  kind: "evidence",
                  items: [
                    { kind: "metric", value: "193", label: "commits" },
                    { kind: "highlight", title: "Testes antes do código", text: "Cada tarefa começa pelo teste." },
                    { kind: "highlight", title: "Gate único", text: "Um comando valida tudo." },
                  ],
                },
              ],
            }
          : section,
      ),
    };
    renderCase(content);
    const root = screen.getByRole("main").querySelector<HTMLElement>(`#${content.sections[0].id}`) as HTMLElement;
    const cards = within(root).getAllByRole("listitem");
    const texts = cards.map((card) => card.textContent);
    expect(texts).toContain("193commits");
    expect(texts).toContain("Testes antes do códigoCada tarefa começa pelo teste.");
    expect(texts).toContain("Gate únicoUm comando valida tudo.");
  });
});
