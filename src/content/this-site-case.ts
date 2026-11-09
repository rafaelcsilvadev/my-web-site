import type { CaseContent } from "@/models/case-content";

const repoUrl = "https://github.com/rafaelcsilvadev/my-web-site";

export const esteSiteCase: CaseContent = {
  slug: "este-site",
  metadata: {
    title: "Este site · Rafael Couto Silva",
    description:
      "Caso Este site: o portfólio feito com spec, teste vermelho primeiro e commits pequenos, com a IA executando e revisão humana de cada mudança.",
  },
  backLink: { label: "Voltar para o início", href: "/" },
  eyebrow: "Caso · Projeto pessoal, feito sozinho",
  title: "Este site",
  intro:
    "O site é a prova do meu jeito de trabalhar. Fiz com spec, teste vermelho primeiro e commits pequenos, com a IA executando e eu revisando.",
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
          kind: "paragraphs",
          items: [
            "Um portfólio estático, rápido e acessível, que mostra o trabalho com evidência e não com adjetivo.",
          ],
        },
      ],
    },
    {
      id: "decisoes",
      number: "02",
      title: "Decisões",
      layout: "split",
      blocks: [
        {
          kind: "callout",
          label: "O que decidi",
          items: [
            "Next.js App Router, com Server Components por padrão e Client Components só onde precisa.",
            "Arquitetura MVVM: Model, ViewModel e View. As regras de importação são checadas pelo ESLint.",
            "Todo texto em um só lugar, em `src/content/`. Nenhum texto fixo nos componentes.",
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
          kind: "evidence",
          items: [
            { kind: "metric", value: "193", label: "commits" },
            {
              kind: "highlight",
              title: "Testes antes do código",
              text: "O teste vermelho vem primeiro, em cada feature.",
            },
            {
              kind: "highlight",
              title: "Gate único",
              text: "Lint, typecheck, testes e build.",
            },
          ],
        },
        {
          kind: "figure",
          src: "/this-site-home.png",
          width: 1679,
          height: 1127,
          alt: "Tela da Home deste site, com o título Desenvolvedor Full Stack do requisito à produção e o retrato de Rafael",
          caption: "A Home deste site.",
        },
      ],
    },
  ],
  stack: {
    label: "Stack",
    groups: [
      {
        chips: ["TypeScript", "Next.js", "Tailwind CSS", "pnpm"],
        mainChips: ["TypeScript", "Next.js"],
      },
    ],
  },
  closing: {
    eyebrow: "Fim dos casos",
    title: "De volta ao início",
    text: "Projetos, experiência, stack e método em uma página.",
    actions: [
      { link: { label: "Voltar ao início", href: "/" }, variant: "ghost", icon: "arrow" },
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
