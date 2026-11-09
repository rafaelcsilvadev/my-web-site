import type { CaseContent } from "@/models/case-content";

export const avariaCase: CaseContent = {
  slug: "avaria",
  metadata: {
    title: "Avaria · Rafael Couto Silva",
    description:
      "Caso Avaria: reconstruí um app difícil de manter. +3 anos em produção, +1 mil clientes.",
  },
  backLink: { label: "Voltar para o início", href: "/" },
  eyebrow: "Caso · Mobs2",
  title: "Avaria",
  intro:
    "Um app difícil de manter virou um sistema com +3 anos em produção e +1 mil clientes. Eu propus a reconstrução e fui o responsável técnico por app e API.",
  heroActions: [],
  facts: [
    { label: "Empresa", value: "Mobs2" },
    { label: "Papel", value: "Responsável técnico na construção · app e API" },
    { label: "Contexto", value: "Empresa pequena, 2 devs nos apps" },
    { label: "Em produção", value: "+3 anos" },
  ],
  sections: [
    {
      id: "problema",
      number: "01",
      title: "Problema",
      layout: "split",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Já existia uma versão do aplicativo, mas ela não estava boa e era difícil de manter. Cada correção pesava mais do que deveria. Por isso reconstruí.",
          ],
        },
      ],
    },
    {
      id: "decisao",
      number: "02",
      title: "Decisão",
      layout: "split",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Propus a reconstrução quando ainda era dev júnior, e ela foi aprovada. Passei a decidir a arquitetura, o app em React Native e a API em Node.js.",
          ],
        },
        {
          kind: "callout",
          label: "Por que AdonisJS",
          items: [
            "Parecido com o Laravel, a stack principal da empresa: os outros devs se adaptariam mais fácil.",
            "Mantém TypeScript no back-end e no mobile.",
            "Descartei o Laravel porque eu e o colega do mobile dominávamos mais o Node.js. Descartei o NestJS porque o AdonisJS é mais próximo do Laravel.",
          ],
        },
      ],
    },
    {
      id: "resultado",
      number: "03",
      title: "Resultado",
      layout: "split",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "O app entrou em produção e ficou no ar por mais de 3 anos, atendendo mais de 1 mil clientes. Depois da entrega, a manutenção passou para outra squad.",
          ],
        },
        {
          kind: "metrics",
          items: [
            { value: "+3 anos", label: "em produção" },
            { value: "+1 mil", label: "clientes" },
            { value: "App e API", label: "construídos por mim" },
          ],
        },
      ],
    },
  ],
  stack: {
    label: "Stack",
    groups: [
      {
        chips: ["TypeScript", "React Native", "Node.js (AdonisJS)", "SQL Server"],
        mainChips: ["TypeScript", "React Native", "Node.js (AdonisJS)", "SQL Server"],
      },
    ],
  },
  closing: {
    eyebrow: "Próximo caso",
    title: "My Trello Version",
    text: "Projeto pessoal, feito sozinho, do requisito ao código.",
    actions: [
      {
        link: { label: "Ver o caso", href: "/casos/my-trello-version" },
        variant: "ghost",
        icon: "arrow",
      },
      { link: { label: "Contato", href: "/#contato" }, variant: "primary" },
      {
        link: { label: "Baixar CV", href: "/cv-rafael-couto-silva.pdf" },
        variant: "ghost",
        icon: "download",
        download: true,
      },
    ],
  },
};
