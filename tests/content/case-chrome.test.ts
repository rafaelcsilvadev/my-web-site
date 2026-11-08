import { describe, expect, it } from "vitest";

import { caseChrome } from "@/content/case-chrome";
import { homeContent } from "@/content/home";
import { splitNavLinks } from "@/viewmodels/home-view-model";

describe("caseChrome", () => {
  it("lists the six nav links in order with explicit hrefs", () => {
    expect(caseChrome.nav.links.map((link) => [link.label, link.href])).toEqual([
      ["Início", "/"],
      ["Projetos", "/#projetos"],
      ["Experiência", "/#experiencia"],
      ["Stack", "/#stack"],
      ["Método", "/#metodo"],
      ["Contato", "/#contato"],
    ]);
  });

  it("marks only Contato as the CTA, pointing to /#contato", () => {
    const { inlineLinks, cta } = splitNavLinks(caseChrome.nav);

    expect(cta).toMatchObject({ label: "Contato", href: "/#contato" });
    expect(inlineLinks.map((link) => link.label)).toEqual([
      "Início",
      "Projetos",
      "Experiência",
      "Stack",
      "Método",
    ]);
  });

  it("points the brand to the home page", () => {
    expect(caseChrome.brandHref).toBe("/");
  });

  it("has the footer copyright and a back-to-top link to #top", () => {
    expect(caseChrome.footer.copyright).toBe("© 2026 Rafael Couto Silva");
    expect(caseChrome.footer.backToTop).toEqual({ label: "Voltar ao topo", href: "#top" });
    expect(caseChrome.topId).toBe("top");
  });

  it("reuses the Home skip link, main id, nav label and menu labels", () => {
    const home = homeContent.chrome;

    expect(caseChrome.skipLinkLabel).toBe(home.skipLinkLabel);
    expect(caseChrome.mainId).toBe(home.mainId);
    expect(caseChrome.nav.ariaLabel).toBe(home.nav.ariaLabel);
    expect(caseChrome.menuButton).toEqual(home.menuButton);
  });
});
