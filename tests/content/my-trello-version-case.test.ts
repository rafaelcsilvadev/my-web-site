import { describe, expect, it } from "vitest";

import { myTrelloVersionCase } from "@/content/my-trello-version-case";
import type { CaseBlock } from "@/models/case-content";

const repoUrl = "https://github.com/rafaelcsilvadev/my-trello-version";

function blocks<K extends CaseBlock["kind"]>(sectionIndex: number, kind: K) {
  return myTrelloVersionCase.sections[sectionIndex].blocks.filter(
    (b) => b.kind === kind,
  ) as Extract<CaseBlock, { kind: K }>[];
}

describe("myTrelloVersionCase hero", () => {
  it("has the slug, back link, eyebrow, title and intro", () => {
    expect(myTrelloVersionCase.slug).toBe("my-trello-version");
    expect(myTrelloVersionCase.backLink).toEqual({ label: "Voltar para o início", href: "/" });
    expect(myTrelloVersionCase.eyebrow).toBe("Caso · Projeto pessoal, feito sozinho");
    expect(myTrelloVersionCase.title).toBe("My Trello Version");
    expect(myTrelloVersionCase.intro).toBe(
      "Uma versão própria de um quadro estilo Trello, do requisito ao código. A prova aberta do ciclo completo de construir software.",
    );
  });

  it("has the GitHub (external, primary) and Contato (secondary) hero actions", () => {
    expect(myTrelloVersionCase.heroActions).toEqual([
      {
        link: { label: "Ver no GitHub", href: repoUrl, external: true },
        variant: "primary",
        icon: "github",
      },
      { link: { label: "Contato", href: "/#contato" }, variant: "ghost" },
    ]);
  });
});

describe("myTrelloVersionCase sections", () => {
  it("has sections 01 Objetivo, 02 Processo and 03 Evidências with unique ids", () => {
    expect(myTrelloVersionCase.sections.map((s) => [s.number, s.title])).toEqual([
      ["01", "Objetivo"],
      ["02", "Processo"],
      ["03", "Evidências"],
    ]);
    const ids = myTrelloVersionCase.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has the Objetivo cards with the lead-in between A dor and the other two", () => {
    expect(myTrelloVersionCase.sections[0].blocks).toEqual([
      {
        kind: "cards",
        items: [
          {
            label: "A dor",
            text: "Eu queria um app de controle de tarefas mais simples, gratuito e customizado. Como não achei, construí o meu.",
          },
        ],
      },
      {
        kind: "paragraphs",
        items: ["Em cima dessa dor, dois propósitos no mesmo projeto."],
      },
      {
        kind: "cards",
        items: [
          {
            label: "Construir",
            text: "Uma API com práticas de produção: arquitetura modular, três níveis de teste, erros padronizados, logs estruturados, tudo em Docker.",
          },
          {
            label: "Mostrar",
            text: "Um jeito disciplinado de construir software com IA: especificação antes do código, TDD, commits pequenos, verificação independente e revisão humana de cada Pull Request.",
          },
        ],
      },
    ]);
  });

  it("has the Processo intro and six steps in order with step 04 highlighted", () => {
    expect(myTrelloVersionCase.sections[1].intro).toBe(
      "Desenvolvimento guiado por especificações. Uma tarefa por branch e por PR, com commits pequenos e o teste vermelho antes do código.",
    );
    const [steps] = blocks(1, "steps");
    expect(steps.items).toEqual([
      { number: "01", title: "Spec", caption: "o que construir" },
      { number: "02", title: "Design", caption: "como construir" },
      { number: "03", title: "Tarefas", caption: "uma por branch" },
      { number: "04", title: "Teste vermelho", caption: "antes do código", highlight: true },
      { number: "05", title: "Código", caption: "commits pequenos" },
      { number: "06", title: "PR", caption: "revisão humana" },
    ]);
  });

  it("has the four Evidências metrics", () => {
    const [metrics] = blocks(2, "metrics");
    expect(metrics.items).toEqual([
      { value: "~456", label: "Pull Requests mergeados" },
      { value: "~1.400", label: "commits na branch principal" },
      { value: "~238", label: "arquivos de teste" },
      { value: "7", label: "funcionalidades no back-end" },
    ]);
  });

  it("has the four Evidências highlights", () => {
    const [highlights] = blocks(2, "highlights");
    expect(highlights.items).toEqual([
      {
        title: "Back-end e front-end separados",
        text: "Com contrato de API compartilhado entre os dois.",
      },
      { title: "Três níveis de teste", text: "Unitários, de integração e e2e." },
      {
        title: "CI com checagens obrigatórias",
        text: "Na branch principal, em GitHub Actions.",
      },
      {
        title: "Funcionalidades entregues",
        text: "Fundação, autenticação, quadros, listas, cartões, etiquetas e checklists.",
      },
    ]);
  });

  it("has the board screenshot figure", () => {
    const [figure] = blocks(2, "figure");
    expect(figure).toEqual({
      kind: "figure",
      src: "/my-trello-version-board.png",
      width: 1797,
      height: 915,
      alt: "Tela do My Trello Version mostrando o quadro Product launch com as colunas To do, Doing e Done",
      caption: "O quadro do My Trello Version: colunas, etiquetas, prazos e checklists.",
    });
  });
});

describe("myTrelloVersionCase stack and closing", () => {
  it("has the four stack groups with their main chips", () => {
    expect(myTrelloVersionCase.stack.label).toBe("Stack");
    expect(myTrelloVersionCase.stack.groups).toEqual([
      {
        label: "Base",
        chips: ["TypeScript", "Node.js 24", "pnpm monorepo"],
        mainChips: ["TypeScript"],
      },
      {
        label: "Back-end",
        chips: ["NestJS", "TypeORM", "PostgreSQL", "Jest"],
        mainChips: ["NestJS"],
      },
      {
        label: "Front-end",
        chips: [
          "React 19",
          "Vite",
          "TanStack Query",
          "React Router",
          "React Aria Components",
          "Tailwind CSS 4",
          "i18next (PT-BR, EN)",
          "Vitest",
          "Playwright",
        ],
        mainChips: ["React 19"],
      },
      {
        label: "Infra",
        chips: ["Docker", "GitHub Actions"],
        mainChips: ["Docker"],
      },
    ]);
  });

  it("has the status note", () => {
    expect(myTrelloVersionCase.stack.note).toBe(
      "Estado: a versão web está completa. O app mobile não foi iniciado, em coerência com o foco em web.",
    );
  });

  it("has the Código aberto closing card with three actions", () => {
    expect(myTrelloVersionCase.closing.eyebrow).toBe("Código aberto");
    expect(myTrelloVersionCase.closing.title).toBe("Leia o código e o histórico");
    expect(myTrelloVersionCase.closing.text).toBe("Cada Pull Request está no repositório.");
    expect(myTrelloVersionCase.closing.actions).toEqual([
      {
        link: { label: "Ver no GitHub", href: repoUrl, external: true },
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

  it("has page metadata with the title and a non-empty description", () => {
    expect(myTrelloVersionCase.metadata.title).toBe("My Trello Version · Rafael Couto Silva");
    expect(myTrelloVersionCase.metadata.description.length).toBeGreaterThan(0);
  });

  it("never contains the [conferir review marker", () => {
    expect(JSON.stringify(myTrelloVersionCase)).not.toContain("[conferir");
  });
});
