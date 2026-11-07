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
  },  projects: {
    sectionId: "projetos",
    eyebrow: "01 · Destaques",
    title: "Projetos em destaque",
    items: [
      {
        id: "avaria",
        context: ["Trabalho · Mobs2", "App + API"],
        title: "Avaria",
        description:
          "Melhoria de uma versão difícil de manter, proposta por mim ainda como dev júnior e aprovada. Passei a responder pelas decisões técnicas. Rodou em produção por mais de 4 anos, para mais de 1 mil clientes.",
        metrics: [
          { label: "Em produção", value: "+4 anos" },
          { label: "Clientes", value: "+1 mil" },
          { label: "Decisão de stack", value: "AdonisJS" },
        ],
        tags: ["TypeScript", "React Native", "Node.js · AdonisJS", "SQL Server"],
        caseLink: { label: "Ver o caso", href: "/casos/avaria" },
      },
      {
        id: "my-trello-version",
        context: ["Projeto pessoal · solo", "Código aberto"],
        title: "My Trello Version",
        description:
          "Nasceu de uma dor real: eu queria um app de tarefas mais simples, gratuito e customizado. Feito sozinho, do requisito ao código, com especificação antes do código, TDD e revisão humana de cada Pull Request.",
        metrics: [
          { label: "PRs mergeados", value: "~456" },
          { label: "commits na main", value: "~1.400" },
          { label: "arquivos de teste", value: "~238" },
        ],
        tags: ["NestJS", "React 19", "PostgreSQL", "Docker"],
        caseLink: { label: "Ver o caso", href: "/casos/my-trello-version" },
        repoLink: {
          label: "Repositório no GitHub",
          href: "https://github.com/rafaelcsilvadev/my-trello-version",
          external: true,
        },
      },
    ],
  },
};
