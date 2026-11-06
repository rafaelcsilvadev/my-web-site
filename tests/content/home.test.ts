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
