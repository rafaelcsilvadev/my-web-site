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
      "Uma versão difícil de manter virou um sistema que rodou em produção por mais de 4 anos, para mais de 1 mil clientes. A melhoria foi proposta por mim, ainda como dev júnior.",
    );
    expect(avariaCase.heroActions).toEqual([]);
  });

  it("has the three facts in order", () => {
    expect(avariaCase.facts).toEqual([
      { label: "Empresa", value: "Mobs2" },
      { label: "Papel", value: "Proponente e responsável técnico" },
      { label: "Estado", value: "Em produção há +4 anos" },
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
      "Já existia uma versão do aplicativo, e ela precisava de manutenção: não funcionava corretamente.",
      "Além de falhar, era difícil de manter. Cada correção pesava mais do que deveria.",
    ]);
  });

  it("has the Decisão paragraph and the AdonisJS callout with two reasons", () => {
    expect(block(1, "paragraphs").items).toEqual([
      "A melhoria foi proposta por mim, ainda como dev júnior, e aprovada. A partir dela passei a responder pelas decisões técnicas.",
    ]);
    expect(block(1, "callout")).toEqual({
      kind: "callout",
      label: "Por que AdonisJS",
      items: [
        "Parecido com o Laravel, que era a stack principal da empresa.",
        "Mantém TypeScript no back-end e no mobile, e o time já conhecia JS.",
      ],
    });
  });

  it("has the Resultado paragraph and three metrics", () => {
    expect(block(2, "paragraphs").items).toEqual([
      "Rodou em produção por mais de 4 anos, atendendo mais de 1 mil clientes.",
    ]);
    expect(block(2, "metrics").items).toEqual([
      { value: "+4 anos", label: "em produção" },
      { value: "+1 mil", label: "clientes" },
      { value: "TS", label: "no back e no mobile" },
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
