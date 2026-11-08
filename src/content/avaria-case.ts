import type { CaseContent } from "@/models/case-content";

export const avariaCase: CaseContent = {
  slug: "avaria",
  metadata: {
    title: "Avaria · Rafael Couto Silva",
    description:
      "Caso Avaria: uma versão difícil de manter virou um sistema que rodou em produção por mais de 4 anos, para mais de 1 mil clientes.",
  },
  backLink: { label: "Voltar para o início", href: "/" },
  eyebrow: "Caso · Mobs2",
  title: "Avaria",
  intro:
    "Uma versão difícil de manter virou um sistema que rodou em produção por mais de 4 anos, para mais de 1 mil clientes. A melhoria foi proposta por mim, ainda como dev júnior.",
  heroActions: [],
  facts: [
    { label: "Empresa", value: "Mobs2" },
    { label: "Papel", value: "Proponente e responsável técnico" },
    { label: "Estado", value: "Em produção há +4 anos" },
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
            "Já existia uma versão do aplicativo, e ela precisava de manutenção: não funcionava corretamente.",
            "Além de falhar, era difícil de manter. Cada correção pesava mais do que deveria.",
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
            "A melhoria foi proposta por mim, ainda como dev júnior, e aprovada. A partir dela passei a responder pelas decisões técnicas.",
          ],
        },
        {
          kind: "callout",
          label: "Por que AdonisJS",
          items: [
            "Parecido com o Laravel, que era a stack principal da empresa.",
            "Mantém TypeScript no back-end e no mobile, e o time já conhecia JS.",
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
          items: ["Rodou em produção por mais de 4 anos, atendendo mais de 1 mil clientes."],
        },
        {
          kind: "metrics",
          items: [
            { value: "+4 anos", label: "em produção" },
            { value: "+1 mil", label: "clientes" },
            { value: "TS", label: "no back e no mobile" },
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
        mainChips: [],
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
