import { describe, expect, it } from "vitest";

import { homeContent } from "@/content/home";

describe("homeContent.chrome", () => {
  const { chrome } = homeContent;

  it("lists the five nav links in order with their section ids", () => {
    expect(chrome.nav.links).toEqual([
      { label: "Projetos", sectionId: "projetos" },
      { label: "Experiência", sectionId: "experiencia" },
      { label: "Stack", sectionId: "stack" },
      { label: "Método", sectionId: "metodo" },
      { label: "Contato", sectionId: "contato" },
    ]);
  });

  it("has the footer copyright and a back-to-top link to #top", () => {
    expect(chrome.footer.copyright).toBe("© 2026 Rafael Couto Silva");
    expect(chrome.footer.backToTop).toEqual({ label: "Voltar ao topo", href: "#top" });
  });

  it("has the main and top anchor ids", () => {
    expect(chrome.mainId).toBe("conteudo");
    expect(chrome.topId).toBe("top");
  });

  it("has non-empty skip link, nav aria-label and menu button labels", () => {
    const values = [
      chrome.skipLinkLabel,
      chrome.nav.ariaLabel,
      chrome.menuButton.openLabel,
      chrome.menuButton.closeLabel,
    ];
    for (const value of values) {
      expect(value.trim()).not.toBe("");
    }
    expect(chrome.menuButton.openLabel).not.toBe(chrome.menuButton.closeLabel);
  });
});

describe("homeContent.hero", () => {
  const { hero } = homeContent;

  it("has the label, headline, badge, intro and stack line", () => {
    expect(hero.label).toBe("Desenvolvedor de software");
    expect(hero.headline).toBe("Especialista Full Stack do requisito à produção");
    expect(hero.badge).toEqual({
      label: "SDD",
      text: "Especialista em desenvolvimento guiado por especificações",
    });
    expect(hero.intro).toBe(
      "Construo software de ponta a ponta, do requisito à produção, guiado por especificações.",
    );
    expect(hero.stackLine).toEqual(["TypeScript", "React", "Node"]);
  });

  it("links Contato to #contato and Baixar CV to the CV PDF", () => {
    expect(hero.actions.contact).toEqual({ label: "Contato", href: "#contato" });
    expect(hero.actions.cv).toEqual({
      label: "Baixar CV",
      href: "/cv-rafael-couto-silva.pdf",
    });
  });

  it("describes the portrait path, size, alt and caption", () => {
    expect(hero.portrait).toEqual({
      src: "/rafael-portrait.png",
      width: 1254,
      height: 1254,
      alt: "Retrato profissional de Rafael Couto Silva em um setup roxo",
      caption: "Retrato criado com IA a partir de uma foto minha",
    });
  });
});

describe("homeContent.projects", () => {
  const { projects } = homeContent;
  const [avaria, trello] = projects.items;

  it("has the section header and exactly two cards in order", () => {
    expect(projects.sectionId).toBe("projetos");
    expect(projects.eyebrow).toBe("01 · Destaques");
    expect(projects.title).toBe("Projetos em destaque");
    expect(projects.items.map((item) => item.title)).toEqual(["Avaria", "My Trello Version"]);
  });

  it("has the Avaria card strings verbatim", () => {
    expect(avaria.context).toEqual(["Trabalho · Mobs2", "App + API"]);
    expect(avaria.description).toBe(
      "Melhoria de uma versão difícil de manter, proposta por mim ainda como dev júnior e aprovada. Passei a responder pelas decisões técnicas. Rodou em produção por mais de 4 anos, para mais de 1 mil clientes.",
    );
    expect(avaria.metrics).toEqual([
      { label: "Em produção", value: "+4 anos" },
      { label: "Clientes", value: "+1 mil" },
      { label: "Decisão de stack", value: "AdonisJS" },
    ]);
    expect(avaria.tags).toEqual(["TypeScript", "React Native", "Node.js · AdonisJS", "SQL Server"]);
    expect(avaria.caseLink).toEqual({ label: "Ver o caso", href: "/casos/avaria" });
    expect(avaria.repoLink).toBeUndefined();
  });

  it("has the My Trello Version card strings verbatim", () => {
    expect(trello.context).toEqual(["Projeto pessoal · solo", "Código aberto"]);
    expect(trello.description).toBe(
      "Nasceu de uma dor real: eu queria um app de tarefas mais simples, gratuito e customizado. Feito sozinho, do requisito ao código, com especificação antes do código, TDD e revisão humana de cada Pull Request.",
    );
    expect(trello.metrics).toEqual([
      { label: "PRs mergeados", value: "~456" },
      { label: "commits na main", value: "~1.400" },
      { label: "arquivos de teste", value: "~238" },
    ]);
    expect(trello.tags).toEqual(["NestJS", "React 19", "PostgreSQL", "Docker"]);
    expect(trello.caseLink).toEqual({ label: "Ver o caso", href: "/casos/my-trello-version" });
    expect(trello.repoLink).toEqual({
      label: "Repositório no GitHub",
      href: "https://github.com/rafaelcsilvadev/my-trello-version",
      external: true,
    });
  });
});
