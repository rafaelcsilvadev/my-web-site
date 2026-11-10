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
    expect(myTrelloVersionCase.eyebrow).toBe("Caso · Projeto pessoal, de ponta a ponta");
    expect(myTrelloVersionCase.title).toBe("My Trello Version");
    expect(myTrelloVersionCase.intro).toBe(
      "Quadro estilo Trello que projetei e entreguei de ponta a ponta, com contrato de API compartilhado, testes em 3 níveis e CI. Cada Pull Request está aberto no GitHub, para você conferir.",
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

  it("has the Objetivo cards: A dor, then Construir and Mostrar", () => {
    expect(myTrelloVersionCase.sections[0].blocks).toEqual([
      {
        kind: "cards",
        items: [
          {
            label: "A dor",
            text: "Não achei um app de tarefas simples, gratuito e customizável. Quis construir o meu e mostrar como uso o Spec-Driven Development.",
          },
        ],
      },
      {
        kind: "cards",
        items: [
          {
            label: "Construir",
            text: "Um app completo com práticas de produção: API modular, erros padronizados, logs estruturados e tudo em Docker.",
          },
          {
            label: "Mostrar",
            text: "Um jeito disciplinado de construir software com IA: eu especifico e decido a arquitetura, a IA executa, eu reviso cada Pull Request.",
          },
        ],
      },
    ]);
  });

  it("has the Processo intro and six steps in order with step 04 highlighted", () => {
    expect(myTrelloVersionCase.sections[1].intro).toBe(
      "Cada feature segue o mesmo ciclo: spec, design, tarefas, teste vermelho, código e PR. Uma tarefa por branch, commits pequenos.",
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
      { value: "3", label: "níveis de teste: unitário, integração e e2e" },
    ]);
  });

  it("has the three Evidências highlights", () => {
    const [highlights] = blocks(2, "highlights");
    expect(highlights.items).toEqual([
      {
        title: "Back-end e front-end separados",
        text: "Com contrato de API compartilhado entre os dois.",
      },
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
      "Escopo: a versão web está completa. O app mobile está fora do escopo por ora.",
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

  it("adds the Próximo caso row pointing to Este site", () => {
    expect(myTrelloVersionCase.closing.next).toEqual({
      eyebrow: "Próximo caso",
      title: "Este site",
      action: {
        link: { label: "Ver o caso", href: "/casos/este-site" },
        variant: "ghost",
        icon: "arrow",
      },
    });
  });

  it("has page metadata with the title and a non-empty description", () => {
    expect(myTrelloVersionCase.metadata.title).toBe("My Trello Version · Rafael Couto Silva");
    expect(myTrelloVersionCase.metadata.description.length).toBeGreaterThan(0);
  });

  it("never contains the [conferir review marker", () => {
    expect(JSON.stringify(myTrelloVersionCase)).not.toContain("[conferir");
  });
});
