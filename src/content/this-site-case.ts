import type { CaseContent } from "@/models/case-content";

const repoUrl = "https://github.com/rafaelcsilvadev/my-web-site";

export const esteSiteCase: CaseContent = {
  slug: "este-site",
  metadata: {
    title: "Este site · Rafael Couto Silva",
    description:
      "Caso Este site: portfólio projetado e entregue de ponta a ponta, com spec, teste vermelho primeiro, arquitetura MVVM com fronteiras checadas por lint e revisão humana de cada mudança.",
  },
  backLink: { label: "Voltar para o início", href: "/" },
  eyebrow: "Caso · Projeto pessoal, de ponta a ponta",
  title: "Este site",
  intro:
    "Projetei, especifiquei e entreguei este site sozinho, como conduziria um produto em time: spec antes do código, teste vermelho primeiro e commits pequenos e revisáveis. A IA executa; eu decido a arquitetura e reviso cada mudança.",
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
          kind: "callout",
          label: "O que decidi e por quê",
          items: [
            "Next.js App Router com Server Components por padrão: o HTML já chega pronto do servidor, bom para SEO, com menos JavaScript no cliente. Client Components só onde há estado ou efeito.",
            "MVVM com fronteiras impostas pelo ESLint: Model, ViewModel e View só se importam na direção certa, então a arquitetura não depende de disciplina.",
            "Todo texto em `src/content/`, sem texto fixo nos componentes: mudar copy não toca em lógica, e a regra é cobrada em revisão.",
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
