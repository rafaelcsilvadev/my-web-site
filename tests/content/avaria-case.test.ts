import { describe, expect, it } from "vitest";

import { avariaCase } from "@/content/avaria-case";
import type { CaseBlock } from "@/models/case-content";

function block<K extends CaseBlock["kind"]>(sectionIndex: number, kind: K) {
  const found = avariaCase.sections[sectionIndex].blocks.find((b) => b.kind === kind);
  return found as Extract<CaseBlock, { kind: K }>;
}

describe("avariaCase hero", () => {
  it("has the slug, back link, eyebrow, title and intro", () => {
    expect(avariaCase.slug).toBe("avaria");
    expect(avariaCase.backLink).toEqual({ label: "Voltar para o início", href: "/" });
    expect(avariaCase.eyebrow).toBe("Caso · Mobs2");
    expect(avariaCase.title).toBe("Avaria");
    expect(avariaCase.intro).toBe(
      "Um app difícil de manter virou um sistema com +3 anos em produção e +1 mil clientes. Eu propus a reconstrução e fui o responsável técnico por app e API.",
    );
    expect(avariaCase.heroActions).toEqual([]);
  });

  it("has the four facts in order", () => {
    expect(avariaCase.facts).toEqual([
      { label: "Empresa", value: "Mobs2" },
      { label: "Papel", value: "Responsável técnico na construção · app e API" },
      { label: "Contexto", value: "Empresa pequena, 2 devs nos apps" },
      { label: "Em produção", value: "+3 anos" },
    ]);
  });
});

describe("avariaCase sections", () => {
  it("has sections 01 Problema, 02 Decisão and 03 Resultado with unique ids", () => {
    expect(avariaCase.sections.map((s) => [s.number, s.title])).toEqual([
      ["01", "Problema"],
      ["02", "Decisão"],
      ["03", "Resultado"],
    ]);
    const ids = avariaCase.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(avariaCase.sections.every((s) => s.layout === "split")).toBe(true);
  });

  it("has the Problema paragraphs", () => {
    expect(block(0, "paragraphs").items).toEqual([
      "Já existia uma versão do aplicativo, mas ela não estava boa e era difícil de manter. Cada correção pesava mais do que deveria. Por isso reconstruí.",
    ]);
  });

  it("has the Decisão paragraph and the AdonisJS callout with three reasons", () => {
    expect(block(1, "paragraphs").items).toEqual([
      "Propus a reconstrução quando ainda era dev júnior, e ela foi aprovada. Passei a decidir a arquitetura, o app em React Native e a API em Node.js.",
    ]);
    expect(block(1, "callout")).toEqual({
      kind: "callout",
      label: "Por que AdonisJS",
      items: [
        "Parecido com o Laravel, a stack principal da empresa: os outros devs se adaptariam mais fácil.",
        "Mantém TypeScript no back-end e no mobile.",
        "Descartei o Laravel porque eu e o colega do mobile dominávamos mais o Node.js. Descartei o NestJS porque o AdonisJS é mais próximo do Laravel.",
      ],
    });
  });

  it("has the Resultado paragraph and three metrics", () => {
    expect(block(2, "paragraphs").items).toEqual([
      "O app entrou em produção e ficou no ar por mais de 3 anos, atendendo mais de 1 mil clientes. Depois da entrega, a manutenção passou para outra squad.",
    ]);
    expect(block(2, "metrics").items).toEqual([
      { value: "+3 anos", label: "em produção" },
      { value: "+1 mil", label: "clientes" },
      { value: "App e API", label: "construídos por mim" },
    ]);
  });
});

describe("avariaCase stack and closing", () => {
  it("has the four stack chips", () => {
    expect(avariaCase.stack.label).toBe("Stack");
    expect(avariaCase.stack.groups).toHaveLength(1);
    expect(avariaCase.stack.groups[0].chips).toEqual([
      "TypeScript",
      "React Native",
      "Node.js (AdonisJS)",
      "SQL Server",
    ]);
  });

  it("has the Próximo caso card with three actions", () => {
    expect(avariaCase.closing.eyebrow).toBe("Próximo caso");
    expect(avariaCase.closing.title).toBe("My Trello Version");
    expect(avariaCase.closing.text).toBe("Projeto pessoal, feito sozinho, do requisito ao código.");
    expect(avariaCase.closing.actions).toEqual([
      { link: { label: "Ver o caso", href: "/casos/my-trello-version" }, variant: "ghost", icon: "arrow" },
      { link: { label: "Contato", href: "/#contato" }, variant: "primary" },
      {
        link: { label: "Baixar CV", href: "/cv-rafael-couto-silva.pdf" },
        variant: "ghost",
        icon: "download",
        download: true,
      },
    ]);
  });

  it("has page metadata with the title and a non-empty description", () => {
    expect(avariaCase.metadata.title).toBe("Avaria · Rafael Couto Silva");
    expect(avariaCase.metadata.description.length).toBeGreaterThan(0);
  });

  it("never contains the [conferir review marker", () => {
    expect(JSON.stringify(avariaCase)).not.toContain("[conferir");
  });
});
