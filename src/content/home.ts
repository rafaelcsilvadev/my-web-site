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
    label: "Desenvolvedor de software",
    headline: { lead: "Desenvolvedor Full Stack", accent: "do requisito à produção" },
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
          "Melhoria de uma versão difícil de manter, proposta por mim ainda como dev júnior e aprovada. Passei a responder pelas decisões técnicas. Rodou em produção por mais de 4 anos, para mais de 1 mil clientes.",
        metrics: [
          { label: "Em produção", value: "+4 anos" },
          { label: "Clientes", value: "+1 mil" },
          { label: "Decisão de stack", value: "AdonisJS" },
        ],
        metricsStyle: "text",
        tags: ["TypeScript", "React Native", "Node.js · AdonisJS", "SQL Server"],
        mainTags: ["TypeScript", "React Native", "Node.js · AdonisJS"],
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
            text: "Propus a melhoria ainda como dev júnior e liderei as decisões técnicas: arquitetura, app em React Native e API em Node.js. Rodou em produção por mais de 4 anos, para mais de 1 mil clientes.",
          },
          { lead: "REALI.", text: "Entreguei a plataforma em React e Next.js, aprovada pelo cliente." },
          {
            lead: "M2, produto principal da empresa.",
            text: "Evoluí o produto com features e melhorias de UX pedidas pelos clientes.",
          },
          {
            lead: "MyMobs, MobsTrack, Mobs2 School e Boletim Diário.",
            text: "Participei da criação dos apps, que ajudaram a Mobs2 a fechar e manter clientes.",
          },
        ],
        tags: ["React Native", "Node.js", "React", "Next.js", "Flutter", "Laravel", "Vue.js", "SQL Server", "Azure DevOps"],
        mainTags: ["React Native", "Node.js", "React"],
        note: "Squads com UX, QA e back-end. Entregas por CI/CD e queries otimizadas.",
        link: { label: "Ver o caso Avaria", href: "/casos/avaria" },
      },
      {
        company: "Duo Technology",
        period: "ago. de 2025 - set. de 2026",
        role: "Desenvolvedor Full Stack",
        achievements: [
          { text: "Entreguei o app FOCO Aluguel de Carros em React Native, aprovado pelos usuários." },
          {
            text: "No Coral, principal sistema da FOCO, tirei do papel pedidos antigos do time de operação, criando as features em Node.js.",
          },
        ],
        tags: ["Node.js · NestJS", "React Native", "Angular", "Jest", "DDD · SOLID"],
        mainTags: ["Node.js · NestJS", "React Native"],
        note: "Claude Code no dia a dia, com revisão de todo código gerado antes do PR.",
      },
      {
        company: "Globals",
        companyDetail: "· Missão Crítica",
        period: "nov. de 2022 - jan. de 2023",
        role: "Desenvolvedor Full Stack",
        achievements: [
          {
            text: "Entreguei em 3 meses o sistema completo de monitoramento de estradas de uma concessionária, um projeto estratégico para ela. As câmeras passaram a ser controladas de um painel só.",
          },
          {
            text: "Planejei a arquitetura, desenvolvi de ponta a ponta, integrei câmeras e aparelhos de ar-condicionado e desenhei as telas junto com o time de UX.",
          },
        ],
        tags: [".NET", "Angular", "Integração com hardware"],
        mainTags: [".NET", "Angular"],
      },
    ],
  },
  stack: {
    sectionId: "stack",
    eyebrow: "03 · Stack",
    title: "Onde sou mais forte",
    main: [
      { name: "TypeScript", note: "fio principal" },
      { name: "React", note: "fio principal" },
      { name: "Node", note: "fio principal" },
    ],
    otherLabel: "também já trabalhei com",
    others: [
      "Next.js",
      "React Native",
      "Flutter",
      "Laravel",
      "Vue.js",
      "AdonisJS",
      ".NET",
      "Angular",
      "SQL Server",
    ],
  },
  method: {
    sectionId: "metodo",
    eyebrow: "04 · Método (SDD)",
    title: "Especificação antes do código",
    intro:
      "Desenvolvimento guiado por especificações, com a IA onde ela ajuda e eu revisando cada PR antes do merge. É o ciclo que uso no My Trello Version.",
    humanLabel: "Eu",
    aiLabel: "IA",
    steps: [
      {
        number: "01",
        title: "Spec",
        human: "Entendo o projeto e decido o que cada feature precisa.",
        ai: "Me ajuda a entender o projeto e cria a spec de cada feature.",
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
        ai: "Me envia o link do PR.",
      },
    ],
    summary: "~456 PRs mergeados · ~238 arquivos de teste · CI com checagens obrigatórias",
    link: { label: "Ver o método no My Trello Version", href: "/casos/my-trello-version" },
  },
  contact: {
    sectionId: "contato",
    eyebrow: "05 · Contato",
    title: "Vamos conversar",
    lead: "Para vaga ou projeto, escolha o canal.",
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
        icon: "whatsapp",
        label: "WhatsApp",
        value: "Abrir conversa",
        href: "https://wa.me/5524999644346",
        external: true,
      },
    ],
  },
};
