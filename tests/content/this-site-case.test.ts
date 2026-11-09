import { describe, expect, it } from "vitest";

import { esteSiteCase } from "@/content/this-site-case";

const repoUrl = "https://github.com/rafaelcsilvadev/my-web-site";

describe("esteSiteCase hero", () => {
  it("has the slug, back link, eyebrow, title and intro", () => {
    expect(esteSiteCase.slug).toBe("este-site");
    expect(esteSiteCase.backLink).toEqual({ label: "Voltar para o início", href: "/" });
    expect(esteSiteCase.eyebrow).toBe("Caso · Projeto pessoal, feito sozinho");
    expect(esteSiteCase.title).toBe("Este site");
    expect(esteSiteCase.intro).toBe(
      "O site é a prova do meu jeito de trabalhar. Fiz com spec, teste vermelho primeiro e commits pequenos, com a IA executando e eu revisando.",
    );
  });

  it("has the GitHub (external, primary) and Contato (secondary) hero actions", () => {
    expect(esteSiteCase.heroActions).toEqual([
      {
        link: { label: "Ver no GitHub", href: repoUrl, external: true },
        variant: "primary",
        icon: "github",
      },
      { link: { label: "Contato", href: "/#contato" }, variant: "ghost" },
    ]);
  });

  it("has the page metadata", () => {
    expect(esteSiteCase.metadata).toEqual({
      title: "Este site · Rafael Couto Silva",
      description:
        "Caso Este site: o portfólio feito com spec, teste vermelho primeiro e commits pequenos, com a IA executando e revisão humana de cada mudança.",
    });
  });
});

describe("esteSiteCase sections", () => {
  it("has sections 01 Objetivo, 02 Decisões and 03 Evidências with unique ids", () => {
    expect(esteSiteCase.sections.map((s) => [s.number, s.title])).toEqual([
      ["01", "Objetivo"],
      ["02", "Decisões"],
      ["03", "Evidências"],
    ]);
    const ids = esteSiteCase.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has the Objetivo paragraph in a split section", () => {
    expect(esteSiteCase.sections[0].layout).toBe("split");
    expect(esteSiteCase.sections[0].blocks).toEqual([
      {
        kind: "paragraphs",
        items: [
          "Um portfólio estático, rápido e acessível, que mostra o trabalho com evidência e não com adjetivo.",
        ],
      },
    ]);
  });

  it("has the Decisões callout with three items, the third marking src/content/ as code", () => {
    expect(esteSiteCase.sections[1].layout).toBe("split");
    expect(esteSiteCase.sections[1].blocks).toEqual([
      {
        kind: "callout",
        label: "O que decidi",
        items: [
          "Next.js App Router, com Server Components por padrão e Client Components só onde precisa.",
          "Arquitetura MVVM: Model, ViewModel e View. As regras de importação são checadas pelo ESLint.",
          "Todo texto em um só lugar, em `src/content/`. Nenhum texto fixo nos componentes.",
        ],
      },
    ]);
  });

  it("has the three evidence items in order in a stacked section", () => {
    expect(esteSiteCase.sections[2].layout).toBe("stacked");
    const evidence = esteSiteCase.sections[2].blocks[0];
    expect(evidence).toEqual({
      kind: "evidence",
      items: [
        { kind: "metric", value: "193", label: "commits" },
        {
          kind: "highlight",
          title: "Testes antes do código",
          text: "O teste vermelho vem primeiro, em cada feature.",
        },
        {
          kind: "highlight",
          title: "Gate único",
          text: "Lint, typecheck, testes e build.",
        },
      ],
    });
  });

  it("has the Home screenshot figure after the evidence", () => {
    expect(esteSiteCase.sections[2].blocks[1]).toEqual({
      kind: "figure",
      src: "/this-site-home.png",
      width: 1679,
      height: 1127,
      alt: "Tela da Home deste site, com o título Desenvolvedor Full Stack do requisito à produção e o retrato de Rafael",
      caption: "A Home deste site.",
    });
    expect(esteSiteCase.sections[2].blocks).toHaveLength(2);
  });
});

describe("esteSiteCase stack", () => {
  it("has the Stack label and one unlabeled group of four chips", () => {
    expect(esteSiteCase.stack.label).toBe("Stack");
    expect(esteSiteCase.stack.groups).toHaveLength(1);
    expect(esteSiteCase.stack.groups[0].label).toBeUndefined();
    expect(esteSiteCase.stack.groups[0].chips).toEqual([
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "pnpm",
    ]);
  });

  it("marks TypeScript and Next.js as main chips and has no note", () => {
    expect(esteSiteCase.stack.groups[0].mainChips).toEqual(["TypeScript", "Next.js"]);
    expect(esteSiteCase.stack.note).toBeUndefined();
  });
});

describe("esteSiteCase closing", () => {
  it("has the eyebrow, title and text", () => {
    expect(esteSiteCase.closing.eyebrow).toBe("Fim dos casos");
    expect(esteSiteCase.closing.title).toBe("De volta ao início");
    expect(esteSiteCase.closing.text).toBe("Projetos, experiência, stack e método em uma página.");
  });

  it("has Voltar ao início, Contato and Baixar CV actions in order", () => {
    expect(esteSiteCase.closing.actions).toEqual([
      { link: { label: "Voltar ao início", href: "/" }, variant: "ghost", icon: "arrow" },
      { link: { label: "Contato", href: "/#contato" }, variant: "primary" },
      {
        link: { label: "Baixar CV", href: "/cv-rafael-couto-silva.pdf" },
        variant: "ghost",
        icon: "download",
        download: true,
      },
    ]);
  });

  it("has no next-case row", () => {
    expect(esteSiteCase.closing.next).toBeUndefined();
  });
});

describe("esteSiteCase review markers", () => {
  it("contains no [conferir marker", () => {
    expect(JSON.stringify(esteSiteCase)).not.toContain("[conferir");
  });
});
