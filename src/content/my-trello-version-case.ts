import type { CaseContent } from "@/models/case-content";

const repoUrl = "https://github.com/rafaelcsilvadev/my-trello-version";

export const myTrelloVersionCase: CaseContent = {
  slug: "my-trello-version",
  metadata: {
    title: "My Trello Version · Rafael Couto Silva",
    description:
      "Caso My Trello Version: um quadro estilo Trello feito sozinho, do requisito ao código, com especificação antes do código, TDD e revisão humana de cada Pull Request.",
  },
  backLink: { label: "Voltar para o início", href: "/" },
  eyebrow: "Caso · Projeto pessoal, feito sozinho",
  title: "My Trello Version",
  intro:
    "Uma versão própria de um quadro estilo Trello, do requisito ao código. A prova aberta do ciclo completo de construir software.",
  heroActions: [
    {
      link: { label: "Ver no GitHub", href: repoUrl, external: true },
      variant: "primary",
      icon: "github",
    },
    { link: { label: "Contato", href: "/#contato" }, variant: "ghost" },
  ],
  facts: [],
  sections: [
    {
      id: "objetivo",
      number: "01",
      title: "Objetivo",
      layout: "split",
      blocks: [
        {
          kind: "cards",
          items: [
            {
              label: "A dor",
              text: "Eu queria um app de controle de tarefas mais simples, gratuito e customizado. Como não achei, construí o meu.",
            },
          ],
        },
        {
          kind: "paragraphs",
          items: ["Em cima dessa dor, dois propósitos no mesmo projeto."],
        },
        {
          kind: "cards",
          items: [
            {
              label: "Construir",
              text: "Uma API com práticas de produção: arquitetura modular, três níveis de teste, erros padronizados, logs estruturados, tudo em Docker.",
            },
            {
              label: "Mostrar",
              text: "Um jeito disciplinado de construir software com IA: especificação antes do código, TDD, commits pequenos, verificação independente e revisão humana de cada Pull Request.",
            },
          ],
        },
      ],
    },
    {
      id: "processo",
      number: "02",
      title: "Processo",
      layout: "stacked",
      intro:
        "Desenvolvimento guiado por especificações. Uma tarefa por branch e por PR, com commits pequenos e o teste vermelho antes do código.",
      blocks: [
        {
          kind: "steps",
          items: [
            { number: "01", title: "Spec", caption: "o que construir" },
            { number: "02", title: "Design", caption: "como construir" },
            { number: "03", title: "Tarefas", caption: "uma por branch" },
            { number: "04", title: "Teste vermelho", caption: "antes do código", highlight: true },
            { number: "05", title: "Código", caption: "commits pequenos" },
            { number: "06", title: "PR", caption: "revisão humana" },
          ],
        },
      ],
    },
    {
      id: "evidencias",
      number: "03",
      title: "Evidências",
      layout: "stacked",
      blocks: [
        {
          kind: "metrics",
          items: [
            { value: "~456", label: "Pull Requests mergeados" },
            { value: "~1.400", label: "commits na branch principal" },
            { value: "~238", label: "arquivos de teste" },
            { value: "7", label: "funcionalidades no back-end" },
          ],
        },
        {
          kind: "highlights",
          items: [
            {
              title: "Back-end e front-end separados",
              text: "Com contrato de API compartilhado entre os dois.",
            },
            { title: "Três níveis de teste", text: "Unitários, de integração e e2e." },
            {
              title: "CI com checagens obrigatórias",
              text: "Na branch principal, em GitHub Actions.",
            },
            {
              title: "Funcionalidades entregues",
              text: "Fundação, autenticação, quadros, listas, cartões, etiquetas e checklists.",
            },
          ],
        },
        {
          kind: "figure",
          src: "/my-trello-version-board.png",
          width: 1797,
          height: 915,
          alt: "Tela do My Trello Version mostrando o quadro Product launch com as colunas To do, Doing e Done",
          caption: "O quadro do My Trello Version: colunas, etiquetas, prazos e checklists.",
        },
      ],
    },
  ],
  stack: {
    label: "Stack",
    groups: [
      {
        label: "Base",
        chips: ["TypeScript", "Node.js 24", "pnpm monorepo"],
        mainChips: ["TypeScript"],
      },
      {
        label: "Back-end",
        chips: ["NestJS", "TypeORM", "PostgreSQL", "Jest"],
        mainChips: ["NestJS"],
      },
      {
        label: "Front-end",
        chips: [
          "React 19",
          "Vite",
          "TanStack Query",
          "React Router",
          "React Aria Components",
          "Tailwind CSS 4",
          "i18next (PT-BR, EN)",
          "Vitest",
          "Playwright",
        ],
        mainChips: ["React 19"],
      },
      {
        label: "Infra",
        chips: ["Docker", "GitHub Actions"],
        mainChips: ["Docker"],
      },
    ],
    note: "Estado: a versão web está completa. O app mobile não foi iniciado, em coerência com o foco em web.",
  },
  closing: {
    eyebrow: "Código aberto",
    title: "Leia o código e o histórico",
    text: "Cada Pull Request está no repositório.",
    actions: [
      {
        link: { label: "Ver no GitHub", href: repoUrl, external: true },
        variant: "primary",
        icon: "arrow",
      },
      { link: { label: "Contato", href: "/#contato" }, variant: "ghost" },
      {
        link: { label: "Baixar CV", href: "/cv-rafael-couto-silva.pdf" },
        variant: "ghost",
        icon: "download",
        download: true,
      },
    ],
  },
};
