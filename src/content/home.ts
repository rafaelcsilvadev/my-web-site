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
  hero: {
    label: "Desenvolvedor de software",
    headline: "Especialista Full Stack do requisito à produção",
    badge: {
      label: "SDD",
      text: "Especialista em desenvolvimento guiado por especificações",
    },
    intro:
      "Construo software de ponta a ponta, do requisito à produção, guiado por especificações.",
    stackLine: ["TypeScript", "React", "Node"],
    actions: {
      contact: { label: "Contato", href: "#contato" },
      cv: { label: "Baixar CV", href: "/cv-rafael-couto-silva.pdf" },
    },
    portrait: {
      src: "/rafael-portrait.png",
      width: 1254,
      height: 1254,
      alt: "Retrato profissional de Rafael Couto Silva em um setup roxo",
      caption: "Retrato criado com IA a partir de uma foto minha",
    },
  },
};
