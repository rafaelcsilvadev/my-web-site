import type { HomeContent } from "@/models/home-content";

export const homeContent: HomeContent = {
  chrome: {
    skipLinkLabel: "Pular para o conteúdo",
    mainId: "conteudo",
    topId: "top",
    nav: {
      ariaLabel: "Navegação principal",
      links: [
        { label: "Projetos", sectionId: "projetos" },
        { label: "Experiência", sectionId: "experiencia" },
        { label: "Stack", sectionId: "stack" },
        { label: "Método", sectionId: "metodo" },
        { label: "Contato", sectionId: "contato" },
      ],
    },
    menuButton: { openLabel: "Abrir menu", closeLabel: "Fechar menu" },
    footer: {
      copyright: "© 2026 Rafael Couto Silva",
      backToTop: { label: "Voltar ao topo", href: "#top" },
    },
  },
};
