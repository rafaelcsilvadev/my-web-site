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
      text: "Com IA, revisão humana em cada PR",
    },
    intro: "Especificação, teste e revisão. Qualidade desde o primeiro commit.",
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
          "Refiz um app difícil de manter. Propus a solução, decidi a arquitetura e entreguei app e API. Ficou +3 anos no ar, com +1 mil clientes.",
        metrics: [
          { label: "Em produção", value: "+3 anos" },
          { label: "Clientes", value: "+1 mil" },
          { label: "Responsável técnico", value: "App e API" },
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
          "Construí o app de tarefas que eu queria usar. Do requisito ao código, sozinho, com testes e CI. Cada PR está aberto no GitHub.",
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
        context: ["Projeto pessoal · solo", "Portfólio"],
        title: "Este site",
        description:
          "O próprio portfólio, feito do jeito que eu trabalho: spec, teste vermelho primeiro e commits pequenos, com a IA executando e eu revisando.",
        metrics: [
          { label: "Commits", value: "193" },
          { label: "Testes", value: "Antes do código" },
          { label: "Checagens", value: "Gate único" },
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
            text: "Responsável técnico na construção: propus a reconstrução, defini a arquitetura e entreguei app (React Native) e API (Node.js). +3 anos em produção, +1 mil clientes.",
          },
          {
            lead: "M2, produto principal da empresa.",
            text: "Mantive e evoluí o produto principal da empresa, com features e UX guiadas pelo pedido dos clientes.",
          },
          {
            lead: "MyMobs, MobsTrack, Mobs2 School e Boletim Diário.",
            text: "Construí, mantive e evoluí os 4 apps, do software ao acompanhamento de QA e UI/UX. Ajudaram a empresa a fechar e manter clientes.",
          },
        ],
        tags: ["React Native", "Node.js", "React", "Flutter", "Laravel", "Vue.js", "SQL Server", "Azure DevOps"],
        mainTags: ["React Native", "Node.js", "React"],
        note: "Squads com UX, QA e back-end. Entregas por CI/CD e queries otimizadas.",
        link: { label: "Ver o caso Avaria", href: "/casos/avaria" },
      },
      {
        company: "Duo Technology",
        period: "ago. de 2025 - set. de 2026",
        role: "Desenvolvedor Full Stack",
        achievements: [
          { text: "Entreguei o app FOCO Aluguel de Carros em React Native e o publiquei para os usuários." },
          {
            text: "No Coral, principal sistema da FOCO, criei em Node.js as features que o time de operação precisava.",
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
            text: "Em 3 meses, evoluí o sistema de monitoramento de estradas de uma concessionária com novas features. Integrei as câmeras, que passaram a ser controladas de um painel só, e implementei as telas seguindo o desenho do time de UX.",
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
      { name: "TypeScript", note: "back, web e mobile" },
      { name: "React", note: "web e React Native" },
      { name: "Node", note: "API em produção por +3 anos e outras em manutenção" },
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
