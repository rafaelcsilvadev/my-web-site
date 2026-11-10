import type { HomeContent } from "@/models/home-content";

export const homeContent: HomeContent = {
  chrome: {
    skipLinkLabel: "Pular para o conteúdo",
    mainId: "conteudo",
    topId: "top",
    nav: {
      ariaLabel: "Navegação principal",
      ctaSectionId: "contato",
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
    label: "Desenvolvedor Full Stack",
    headline: { lead: "Desenvolvedor Full Stack", accent: "resolvendo problemas de forma moderna" },
    badge: {
      label: "SDD",
      text: "Spec-Driven Development, com IA e revisão humana",
    },
    intro: "Utilizo IA para entregar produtos de qualidade em pouco tempo, evitando bugs e agilizando pontos complexos.",
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
  projects: {
    sectionId: "projetos",
    eyebrow: "01 · Destaques",
    title: "Projetos em destaque",
    items: [
      {
        id: "avaria",
        context: ["Trabalho · Mobs2", "App + API"],
        title: "Avaria",
        description:
          "Um app difícil de manter precisava ser refeito. Propus a reformulação de um projeto de grande importância para a empresa. Ficou em produção por ~3 anos, com uso de ~1 mil funcionários das empresas clientes.",
        metrics: [
          { label: "Em produção", value: "~3 anos" },
          { label: "Funcionários das empresas clientes", value: "~1 mil" },
          { label: "Responsável técnico", value: "App e API" },
        ],
        metricsStyle: "text",
        tags: ["TypeScript", "React Native", "Node.js · AdonisJS", "SQL Server"],
        mainTags: ["TypeScript", "React Native", "Node.js · AdonisJS"],
        caseLink: { label: "Ver o caso", href: "/casos/avaria" },
      },
      {
        id: "my-trello-version",
        context: ["Projeto pessoal · ponta a ponta", "Código aberto"],
        title: "My Trello Version",
        description:
          "Quis projetar o meu gerenciador de tarefas e mostrar como utilizo o SDD. Com isso criei o My Trello Version, um projeto completo de como utilizo o Spec-Driven Development, do back-end ao front-end, passando pela infraestrutura.",
        metrics: [
          { label: "PRs mergeados", value: "~456" },
          { label: "commits na main", value: "~1.400" },
          { label: "arquivos de teste", value: "~238" },
        ],
        metricsStyle: "number",
        tags: ["NestJS", "React 19", "PostgreSQL", "Docker"],
        mainTags: ["NestJS", "React 19"],
        caseLink: { label: "Ver o caso", href: "/casos/my-trello-version" },
        repoLink: {
          label: "Repositório no GitHub",
          href: "https://github.com/rafaelcsilvadev/my-trello-version",
          external: true,
        },
      },
      {
        id: "este-site",
        context: ["Projeto pessoal · ponta a ponta", "Portfólio"],
        title: "Este site",
        description:
          "Criei este site para ser mais uma forma de mostrar como uso o Spec-Driven Development em sites institucionais, além de apresentar melhor toda a minha bagagem na área de desenvolvimento de software.",
        metrics: [
          { label: "Commits", value: "193" },
          { label: "Testes", value: "Antes do código" },
          { label: "Checagens", value: "Lint, tipos, testes, build" },
        ],
        metricsStyle: "rows",
        layout: "wide",
        tags: ["TypeScript", "Next.js", "Tailwind CSS", "pnpm"],
        mainTags: ["TypeScript", "Next.js"],
        caseLink: { label: "Ver o caso", href: "/casos/este-site" },
        repoLink: {
          label: "Repositório no GitHub",
          href: "https://github.com/rafaelcsilvadev/my-web-site",
          external: true,
        },
      },
    ],
  },
  experience: {
    sectionId: "experiencia",
    eyebrow: "02 · Experiência",
    title: "Onde construí",
    entries: [
      {
        company: "Mobs2",
        duration: "4 anos",
        period: "jun. de 2021 - set. de 2025",
        role: "Desenvolvedor Full Stack",
        achievements: [
          {
            lead: "Avaria.",
            text: "Propus uma arquitetura simples, baseada em MVC, para um app mobile complexo demais para escalar. Mantive React Native no mobile e escolhi AdonisJS no back-end, por ser próximo do Laravel, que as outras equipes dominavam. A versão lançada ficou em uso por ~3 anos.",
          },
          {
            lead: "M2, produto principal da empresa.",
            text: "Mantive e evoluí o produto principal da empresa, com features e UX guiadas pelo pedido dos clientes.",
          },
          {
            lead: "MyMobs, MobsTrack, Mobs2 School e Boletim Diário.",
            text: "Com o crescimento da squad mobile, surgiram novos problemas para as transportadoras. Atuei com a squad de negócio nas decisões de design e no desenvolvimento, sempre com arquitetura hexagonal e Flutter. Os projetos foram de extrema importância para conquistar e manter clientes.",
          },
        ],
        tags: ["React Native", "Node.js", "React", "Flutter", "Laravel", "Vue.js", "SQL Server", "Azure DevOps"],
        mainTags: ["React Native", "Node.js", "React"],
        note: "Squads com UX, QA e back-end. Entregas por CI/CD e queries otimizadas.",
        link: { label: "Ver o caso Avaria", href: "/casos/avaria" },
      },
      {
        company: "DUO Technology",
        period: "ago. de 2025 - set. de 2026",
        role: "Desenvolvedor Full Stack",
        achievements: [
          { lead: "FOCO Aluguel de Carros.", text: "O app limitava o avanço da empresa. Apoiei a equipe mobile na reescrita, propus arquitetura hexagonal com princípios de DDD e migrei de Flutter para React Native. Publiquei o app para os usuários, com boa escalabilidade e manutenibilidade." },
          {
            lead: "Coral, principal sistema da FOCO.",
            text: "Tinha funcionalidades pendentes para o time de operação. Criei essas features em Node.js, aplicando IA em cada tarefa. Entreguei atividades complexas em menos tempo e com boa qualidade.",
          },
        ],
        tags: ["Node.js · NestJS", "React Native", "Angular", "Jest", "DDD · SOLID"],
        mainTags: ["Node.js · NestJS", "React Native"],
        note: "Claude Code no dia a dia, com revisão de todo código gerado antes do PR.",
      },
    ],
  },
  stack: {
    sectionId: "stack",
    eyebrow: "03 · Stack",
    title: "Onde sou mais forte",
    main: [
      { name: "TypeScript", note: "back, web e mobile" },
      { name: "React", note: "web e React Native" },
      { name: "Node", note: "API em produção por ~3 anos e outras em manutenção" },
    ],
    otherLabel: "também já trabalhei com",
    others: [
      "React Native",
      "AdonisJS",
      ".NET",
      "Angular",
      "Flutter",
      "Laravel",
      "Vue.js",
      "SQL Server",
    ],
    mainOthers: ["React Native", "AdonisJS", ".NET", "Angular"],
  },
  method: {
    sectionId: "metodo",
    eyebrow: "04 · Método (SDD)",
    title: "Especificação antes do código",
    intro:
      "Eu decido, a IA executa, e cada PR passa por mim antes do merge. Esse é o ciclo do My Trello Version.",
    humanLabel: "Eu",
    aiLabel: "IA",
    steps: [
      {
        number: "01",
        title: "Spec",
        human: "Decido o que cada feature precisa.",
        ai: "Cria a spec de cada feature.",
      },
      { number: "02", title: "Design", human: "Decido a arquitetura e os contratos." },
      {
        number: "03",
        title: "Tarefas",
        human: "Aprovo o recorte: uma tarefa por branch e por PR.",
      },
      {
        number: "04",
        title: "Teste vermelho",
        human: "Reviso os testes no PR.",
        ai: "Cria os testes com TDD: o teste vermelho vem antes do código.",
        highlight: true,
      },
      {
        number: "05",
        title: "Código",
        human: "Exijo commits pequenos.",
        ai: "Implementa até o teste passar.",
      },
      {
        number: "06",
        title: "PR com revisão humana",
        human: "Reviso cada Pull Request antes do merge.",
        ai: "Abre o PR com o resumo das mudanças.",
      },
    ],
    summary: "CI com checagens obrigatórias",
    link: { label: "Ver o método no My Trello Version", href: "/casos/my-trello-version" },
  },
  contact: {
    sectionId: "contato",
    eyebrow: "05 · Contato",
    title: "Vamos conversar",
    lead: "Disponível para novas oportunidades.",
    cv: { label: "Baixar CV", href: "/cv-rafael-couto-silva.pdf" },
    whatsapp: { label: "Chamar no WhatsApp", href: "https://wa.me/5524999644346", external: true },
    cards: [
      {
        icon: "mail",
        label: "E-mail",
        value: "rafacsilva016@gmail.com",
        href: "mailto:rafacsilva016@gmail.com",
      },
      {
        icon: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/rafa-couto",
        href: "https://linkedin.com/in/rafa-couto",
        external: true,
      },
      {
        icon: "github",
        label: "GitHub",
        value: "github.com/rafaelcsilvadev",
        href: "https://github.com/rafaelcsilvadev",
        external: true,
      },
      {
        icon: "youtube",
        label: "YouTube",
        value: "youtube.com/@rafa_couto_dev",
        href: "https://www.youtube.com/@rafa_couto_dev",
        external: true,
      },
      {
        icon: "instagram",
        label: "Instagram",
        value: "instagram.com/rafa_couto_dev",
        href: "https://www.instagram.com/rafa_couto_dev",
        external: true,
      },
    ],
  },
};
