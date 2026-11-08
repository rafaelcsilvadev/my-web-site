import type { HomeContent } from "@/models/home-content";

import { homeContent } from "./home";

const home = homeContent.chrome;

export const caseChrome: HomeContent["chrome"] = {
  skipLinkLabel: home.skipLinkLabel,
  mainId: home.mainId,
  topId: home.topId,
  brandHref: "/",
  nav: {
    ariaLabel: home.nav.ariaLabel,
    ctaSectionId: "contato",
    links: [
      { label: "Início", href: "/" },
      { label: "Projetos", sectionId: "projetos", href: "/#projetos" },
      { label: "Experiência", sectionId: "experiencia", href: "/#experiencia" },
      { label: "Stack", sectionId: "stack", href: "/#stack" },
      { label: "Método", sectionId: "metodo", href: "/#metodo" },
      { label: "Contato", sectionId: "contato", href: "/#contato" },
    ],
  },
  menuButton: home.menuButton,
  footer: home.footer,
};
