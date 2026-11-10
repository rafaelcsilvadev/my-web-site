import type { CaseContent } from "@/models/case-content";

const repoUrl = "https://github.com/rafaelcsilvadev/my-web-site";

export const esteSiteCase: CaseContent = {
  slug: "este-site",
  metadata: {
    title: "Este site · Rafael Couto Silva",
    description:
      "Caso Este site: portfólio para mostrar minhas habilidades com Spec-Driven Development e apresentar, de forma detalhada, pontos da minha carreira.",
  },
  backLink: { label: "Voltar para o início", href: "/" },
  eyebrow: "Caso · Projeto pessoal, de ponta a ponta",
  title: "Este site",
  intro:
    "Site para mostrar minhas habilidades com Spec-Driven Development e apresentar, de forma detalhada, pontos da minha carreira.",
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
            "Um portfólio estático, rápido e acessível, que mostra o trabalho com evidência e não com adjetivo. Também é onde aplico, em escala pequena, o mesmo processo que levo para produção.",
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
          kind: "cards",
          items: [
            {
              label: "A dor",
              text: "Um currículo não mostra como eu trabalho. Faltava um lugar para provar minhas habilidades com evidência, e não com adjetivo.",
            },
          ],
        },
        {
          kind: "cards",
          items: [
            {
              label: "Construir",
              text: "Um portfólio estático, rápido e acessível: Next.js App Router com Server Components por padrão, MVVM com fronteiras impostas pelo ESLint e todo texto em src/content/, sem texto fixo nos componentes.",
            },
            {
              label: "Mostrar",
              text: "Como uso o Spec-Driven Development em um site institucional: spec antes do código, teste vermelho primeiro e commits pequenos. A IA executa; eu decido a arquitetura e reviso cada mudança.",
            },
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
              text: "Cada feature começa por um teste que falha pelo motivo certo.",
            },
            {
              kind: "highlight",
              title: "Gate único",
              text: "Lint, typecheck, testes e build precisam passar em cada commit.",
            },
          ],
        },
        {
          kind: "figure",
          src: "/this-site-home.png",
          width: 1660,
          height: 1071,
          alt: "Tela da Home deste site, com o título Desenvolvedor Full Stack resolvendo problemas de forma moderna e o retrato de Rafael",
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
    eyebrow: "Código aberto",
    title: "Leia o código e o histórico",
    text: "Cada commit está no repositório.",
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
      title: "Avaria",
      action: {
        link: { label: "Ver o caso", href: "/casos/avaria" },
        variant: "ghost",
        icon: "arrow",
      },
    },
  },
};
