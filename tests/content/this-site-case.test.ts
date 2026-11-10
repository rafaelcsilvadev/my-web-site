import { describe, expect, it } from "vitest";

import { esteSiteCase } from "@/content/this-site-case";

const repoUrl = "https://github.com/rafaelcsilvadev/my-web-site";

describe("esteSiteCase hero", () => {
  it("has the slug, back link, eyebrow, title and intro", () => {
    expect(esteSiteCase.slug).toBe("este-site");
    expect(esteSiteCase.backLink).toEqual({ label: "Voltar para o início", href: "/" });
    expect(esteSiteCase.eyebrow).toBe("Caso · Projeto pessoal, de ponta a ponta");
    expect(esteSiteCase.title).toBe("Este site");
    expect(esteSiteCase.intro).toBe(
      "Site para mostrar minhas habilidades com Spec-Driven Development e apresentar, de forma detalhada, pontos da minha carreira.",
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
        "Caso Este site: portfólio para mostrar minhas habilidades com Spec-Driven Development e apresentar, de forma detalhada, pontos da minha carreira.",
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
          "Um portfólio estático, rápido e acessível, que mostra o trabalho com evidência e não com adjetivo. Também é onde aplico, em escala pequena, o mesmo processo que levo para produção.",
        ],
      },
    ]);
  });

  it("has the Decisões as A dor, Construir and Mostrar cards, one on the left and two on the right", () => {
    expect(esteSiteCase.sections[1].layout).toBe("split");
    expect(esteSiteCase.sections[1].blocks).toEqual([
      {
        kind: "cards",
        items: [
          {
            label: "A dor",
            text: "Um currículo não mostra como eu trabalho. Faltava um lugar para provar minhas habilidades com evidência, e não com adjetivo.",
          },
        ],
      },
      {
        kind: "cards",
        items: [
          {
            label: "Construir",
            text: "Um portfólio estático, rápido e acessível: Next.js App Router com Server Components por padrão, MVVM com fronteiras impostas pelo ESLint e todo texto em src/content/, sem texto fixo nos componentes.",
          },
          {
            label: "Mostrar",
            text: "Como uso o Spec-Driven Development em um site institucional: spec antes do código, teste vermelho primeiro e commits pequenos. A IA executa; eu decido a arquitetura e reviso cada mudança.",
          },
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
          text: "Cada feature começa por um teste que falha pelo motivo certo.",
        },
        {
          kind: "highlight",
          title: "Gate único",
          text: "Lint, typecheck, testes e build precisam passar em cada commit.",
        },
      ],
    });
  });

  it("has the Home screenshot figure after the evidence", () => {
    expect(esteSiteCase.sections[2].blocks[1]).toEqual({
      kind: "figure",
      src: "/this-site-home.png",
      width: 1660,
      height: 1071,
      alt: "Tela da Home deste site, com o título Desenvolvedor Full Stack resolvendo problemas de forma moderna e o retrato de Rafael",
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
    expect(esteSiteCase.closing.eyebrow).toBe("Código aberto");
    expect(esteSiteCase.closing.title).toBe("Leia o código e o histórico");
    expect(esteSiteCase.closing.text).toBe("Cada commit está no repositório.");
  });

  it("has Ver no GitHub, Contato and Baixar CV actions in order", () => {
    expect(esteSiteCase.closing.actions).toEqual([
      {
        link: { label: "Ver no GitHub", href: "https://github.com/rafaelcsilvadev/my-web-site", external: true },
        variant: "primary",
        icon: "arrow",
      },
      { link: { label: "Contato", href: "/#contato" }, variant: "ghost" },
      {
        link: { label: "Baixar CV", href: "/cv-rafael-couto-silva.pdf" },
        variant: "ghost",
        icon: "download",
        download: true,
      },
    ]);
  });

  it("points the next-case row to Avaria", () => {
    expect(esteSiteCase.closing.next).toEqual({
      eyebrow: "Próximo caso",
      title: "Avaria",
      action: {
        link: { label: "Ver o caso", href: "/casos/avaria" },
        variant: "ghost",
        icon: "arrow",
      },
    });
  });
});

describe("esteSiteCase review markers", () => {
  it("contains no [conferir marker", () => {
    expect(JSON.stringify(esteSiteCase)).not.toContain("[conferir");
  });
});
