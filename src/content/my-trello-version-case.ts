import type { CaseContent } from "@/models/case-content";

const repoUrl = "https://github.com/rafaelcsilvadev/my-trello-version";

export const myTrelloVersionCase: CaseContent = {
  slug: "my-trello-version",
  metadata: {
    title: "My Trello Version · Rafael Couto Silva",
    description:
      "Caso My Trello Version: quadro estilo Trello projetado e entregue de ponta a ponta. Código aberto, testes em 3 níveis, CI e revisão de cada Pull Request.",
  },
  backLink: { label: "Voltar para o início", href: "/" },
  eyebrow: "Caso · Projeto pessoal, de ponta a ponta",
  title: "My Trello Version",
  intro:
    "Quadro estilo Trello que projetei e entreguei de ponta a ponta, com contrato de API compartilhado, testes em 3 níveis e CI. Cada Pull Request está aberto no GitHub, para você conferir.",
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
              text: "Não achei um app de tarefas simples, gratuito e customizável. Defini o escopo e construí o meu.",
            },
          ],
        },
        {
          kind: "cards",
          items: [
            {
              label: "Construir",
              text: "Um app completo com práticas de produção: API modular, erros padronizados, logs estruturados e tudo em Docker.",
            },
            {
              label: "Mostrar",
              text: "Um jeito disciplinado de construir software com IA: eu especifico e decido a arquitetura, a IA executa, eu reviso cada Pull Request.",
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
        "Cada feature segue o mesmo ciclo: spec, design, tarefas, teste vermelho, código e PR. Uma tarefa por branch, commits pequenos.",
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
            { value: "3", label: "níveis de teste: unitário, integração e e2e" },
          ],
        },
        {
          kind: "highlights",
          items: [
            {
              title: "Back-end e front-end separados",
              text: "Com contrato de API compartilhado entre os dois.",
            },
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
    note: "Escopo: a versão web está completa. O app mobile está fora do escopo por ora.",
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
    next: {
      eyebrow: "Próximo caso",
      title: "Este site",
      action: {
        link: { label: "Ver o caso", href: "/casos/este-site" },
        variant: "ghost",
        icon: "arrow",
      },
    },
  },
};
