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
