import { describe, expect, it } from "vitest";

import { homeContent } from "@/content/home";

describe("homeContent.chrome", () => {
  const { chrome } = homeContent;

  it("lists the five nav links in order with their section ids", () => {
    expect(chrome.nav.links).toEqual([
      { label: "Projetos", sectionId: "projetos" },
      { label: "Experiência", sectionId: "experiencia" },
      { label: "Stack", sectionId: "stack" },
      { label: "Método", sectionId: "metodo" },
      { label: "Contato", sectionId: "contato" },
    ]);
  });

  it("has the footer copyright and a back-to-top link to #top", () => {
    expect(chrome.footer.copyright).toBe("© 2026 Rafael Couto Silva");
    expect(chrome.footer.backToTop).toEqual({ label: "Voltar ao topo", href: "#top" });
  });

  it("has the main and top anchor ids", () => {
    expect(chrome.mainId).toBe("conteudo");
    expect(chrome.topId).toBe("top");
  });

  it("has non-empty skip link, nav aria-label and menu button labels", () => {
    const values = [
      chrome.skipLinkLabel,
      chrome.nav.ariaLabel,
      chrome.menuButton.openLabel,
      chrome.menuButton.closeLabel,
    ];
    for (const value of values) {
      expect(value.trim()).not.toBe("");
    }
    expect(chrome.menuButton.openLabel).not.toBe(chrome.menuButton.closeLabel);
  });
});

describe("homeContent.hero", () => {
  const { hero } = homeContent;

  it("has the label, headline, badge, intro and stack line", () => {
    expect(hero.label).toBe("Desenvolvedor de software");
    expect(hero.headline).toEqual({
      lead: "Desenvolvedor Full Stack",
      accent: "do requisito à produção",
    });
    expect(hero.badge).toEqual({
      label: "SDD",
      text: "Especialista em desenvolvimento guiado por especificações",
    });
    expect(hero.intro).toBe(
      "Construo software de ponta a ponta, do requisito à produção, guiado por especificações.",
    );
    expect(hero.stackLine).toEqual(["TypeScript", "React", "Node"]);
  });

  it("links Contato to #contato and Baixar CV to the CV PDF", () => {
    expect(hero.actions.contact).toEqual({ label: "Contato", href: "#contato" });
    expect(hero.actions.cv).toEqual({
      label: "Baixar CV",
      href: "/cv-rafael-couto-silva.pdf",
    });
  });

  it("describes the portrait path, size, alt and caption", () => {
    expect(hero.portrait).toEqual({
      src: "/rafael-portrait.png",
      width: 1254,
      height: 1254,
      alt: "Retrato profissional de Rafael Couto Silva em um setup roxo",
      caption: "Retrato criado com IA a partir de uma foto minha",
    });
  });
});

describe("homeContent.projects", () => {
  const { projects } = homeContent;
  const [avaria, trello] = projects.items;

  it("has the section header and exactly two cards in order", () => {
    expect(projects.sectionId).toBe("projetos");
    expect(projects.eyebrow).toBe("01 · Destaques");
    expect(projects.title).toBe("Projetos em destaque");
    expect(projects.items.map((item) => item.title)).toEqual(["Avaria", "My Trello Version"]);
  });

  it("has the Avaria card strings verbatim", () => {
    expect(avaria.context).toEqual(["Trabalho · Mobs2", "App + API"]);
    expect(avaria.description).toBe(
      "Melhoria de uma versão difícil de manter, proposta por mim ainda como dev júnior e aprovada. Passei a responder pelas decisões técnicas. Rodou em produção por mais de 4 anos, para mais de 1 mil clientes.",
    );
    expect(avaria.metrics).toEqual([
      { label: "Em produção", value: "+4 anos" },
      { label: "Clientes", value: "+1 mil" },
      { label: "Decisão de stack", value: "AdonisJS" },
    ]);
    expect(avaria.tags).toEqual(["TypeScript", "React Native", "Node.js · AdonisJS", "SQL Server"]);
    expect(avaria.caseLink).toEqual({ label: "Ver o caso", href: "/casos/avaria" });
    expect(avaria.metricsStyle).toBe("text");
    expect(avaria.mainTags).toEqual(["TypeScript", "React Native", "Node.js · AdonisJS"]);
    expect(avaria.repoLink).toBeUndefined();
  });

  it("has the My Trello Version card strings verbatim", () => {
    expect(trello.context).toEqual(["Projeto pessoal · solo", "Código aberto"]);
    expect(trello.description).toBe(
      "Nasceu de uma dor real: eu queria um app de tarefas mais simples, gratuito e customizado. Feito sozinho, do requisito ao código, com especificação antes do código, TDD e revisão humana de cada Pull Request.",
    );
    expect(trello.metrics).toEqual([
      { label: "PRs mergeados", value: "~456" },
      { label: "commits na main", value: "~1.400" },
      { label: "arquivos de teste", value: "~238" },
    ]);
    expect(trello.tags).toEqual(["NestJS", "React 19", "PostgreSQL", "Docker"]);
    expect(trello.metricsStyle).toBe("number");
    expect(trello.mainTags).toEqual(["NestJS", "React 19"]);
    expect(trello.caseLink).toEqual({ label: "Ver o caso", href: "/casos/my-trello-version" });
    expect(trello.repoLink).toEqual({
      label: "Repositório no GitHub",
      href: "https://github.com/rafaelcsilvadev/my-trello-version",
      external: true,
    });
  });
});

describe("homeContent.experience", () => {
  const { experience } = homeContent;
  const [mobs2, duo, globals] = experience.entries;

  it("has the section heading and id", () => {
    expect(experience.sectionId).toBe("experiencia");
    expect(experience.eyebrow).toBe("02 · Experiência");
    expect(experience.title).toBe("Onde construí");
  });

  it("lists the three entries in order with period or duration", () => {
    expect(experience.entries.map((entry) => entry.company)).toEqual([
      "Mobs2",
      "Duo Technology",
      "Globals",
    ]);
    expect(globals.companyDetail).toBe("· Missão Crítica");
    expect(mobs2.duration).toBe("4 anos");
    expect(mobs2.period).toBe("jun. de 2021 - set. de 2025");
    expect(duo.period).toBe("ago. de 2025 - set. de 2026");
    expect(globals.period).toBe("nov. de 2022 - jan. de 2023");
  });

  it("gives every entry the Full Stack role", () => {
    for (const entry of experience.entries) {
      expect(entry.role).toBe("Desenvolvedor Full Stack");
    }
  });

  it("has the Mobs2 achievements with bold lead-ins verbatim", () => {
    expect(mobs2.achievements).toEqual([
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
    ]);
    expect(mobs2.tags).toEqual([
      "React Native",
      "Node.js",
      "React",
      "Next.js",
      "Flutter",
      "Laravel",
      "Vue.js",
      "SQL Server",
      "Azure DevOps",
    ]);
    expect(mobs2.note).toBe("Squads com UX, QA e back-end. Entregas por CI/CD e queries otimizadas.");
    expect(mobs2.link).toEqual({ label: "Ver o caso Avaria", href: "/casos/avaria" });
  });

  it("has the Duo Technology entry verbatim", () => {
    expect(duo.achievements).toEqual([
      { text: "Entreguei o app FOCO Aluguel de Carros em React Native, aprovado pelos usuários." },
      {
        text: "No Coral, principal sistema da FOCO, tirei do papel pedidos antigos do time de operação, criando as features em Node.js.",
      },
    ]);
    expect(duo.tags).toEqual(["Node.js · NestJS", "React Native", "Angular", "Jest", "DDD · SOLID"]);
    expect(duo.note).toBe("Claude Code no dia a dia, com revisão de todo código gerado antes do PR.");
    expect(duo.link).toBeUndefined();
  });

  it("has the Globals entry verbatim", () => {
    expect(globals.achievements).toEqual([
      {
        text: "Entreguei em 3 meses o sistema completo de monitoramento de estradas de uma concessionária, um projeto estratégico para ela. As câmeras passaram a ser controladas de um painel só.",
      },
      {
        text: "Planejei a arquitetura, desenvolvi de ponta a ponta, integrei câmeras e aparelhos de ar-condicionado e desenhei as telas junto com o time de UX.",
      },
    ]);
    expect(globals.tags).toEqual([".NET", "Angular", "Integração com hardware"]);
    expect(globals.note).toBeUndefined();
    expect(globals.link).toBeUndefined();
  });

  it("contains no placeholder text", () => {
    expect(JSON.stringify(experience)).not.toContain("[PERÍODO]");
  });
});

describe("homeContent.stack", () => {
  const { stack } = homeContent;

  it("has the section heading and id", () => {
    expect(stack.sectionId).toBe("stack");
    expect(stack.eyebrow).toBe("03 · Stack");
    expect(stack.title).toBe("Onde sou mais forte");
  });

  it("lists TypeScript, React and Node as the main thread, in order", () => {
    expect(stack.main).toEqual([
      { name: "TypeScript", note: "fio principal" },
      { name: "React", note: "fio principal" },
      { name: "Node", note: "fio principal" },
    ]);
  });

  it("lists the nine other technologies verbatim, in order, under its label", () => {
    expect(stack.otherLabel).toBe("também já trabalhei com");
    expect(stack.others).toEqual([
      "React Native",
      "AdonisJS",
      ".NET",
      "Angular",
      "Next.js",
      "Flutter",
      "Laravel",
      "Vue.js",
      "SQL Server",
    ]);
  });
});

describe("homeContent.stack highlighted others", () => {
  it("highlights React Native, AdonisJS, .NET and Angular", () => {
    expect(homeContent.stack.mainOthers).toEqual(["React Native", "AdonisJS", ".NET", "Angular"]);
  });
});

describe("homeContent.method", () => {
  const { method } = homeContent;

  it("has the section id, eyebrow, title and intro", () => {
    expect(method.sectionId).toBe("metodo");
    expect(method.eyebrow).toBe("04 · Método (SDD)");
    expect(method.title).toBe("Especificação antes do código");
    expect(method.intro).toBe(
      "Desenvolvimento guiado por especificações, com a IA, e eu reviso cada PR antes do merge. É o ciclo que uso no My Trello Version.",
    );
  });

  it("has the summary line and the case link", () => {
    expect(method.summary).toBe(
      "~456 PRs mergeados · ~238 arquivos de teste · CI com checagens obrigatórias",
    );
    expect(method.link).toEqual({
      label: "Ver o método no My Trello Version",
      href: "/casos/my-trello-version",
    });
  });

  it("never contains the design review marker '[conferir'", () => {
    expect(JSON.stringify(method)).not.toContain("[conferir");
  });

  it("labels the human and AI rows", () => {
    expect(method.humanLabel).toBe("Eu");
    expect(method.aiLabel).toBe("IA");
  });

  it("lists the six steps numbered 01 to 06 with their titles, in order", () => {
    expect(method.steps.map((s) => [s.number, s.title])).toEqual([
      ["01", "Spec"],
      ["02", "Design"],
      ["03", "Tarefas"],
      ["04", "Teste vermelho"],
      ["05", "Código"],
      ["06", "PR com revisão humana"],
    ]);
  });

  it("has every Eu and IA line verbatim", () => {
    expect(method.steps.map((s) => [s.human, s.ai])).toEqual([
      [
        "Entendo o projeto e decido o que cada feature precisa.",
        "Me ajuda a entender o projeto e cria a spec de cada feature.",
      ],
      ["Decido a arquitetura e os contratos.", undefined],
      ["Aprovo o recorte: uma tarefa por branch e por PR.", undefined],
      ["Reviso os testes no PR.", "Cria os testes com TDD: o teste vermelho vem antes do código."],
      ["Exijo commits pequenos.", "Implementa até o teste passar."],
      ["Reviso cada Pull Request antes do merge.", "Me envia o link do PR."],
    ]);
  });

  it("highlights only the red test step", () => {
    expect(method.steps.filter((s) => s.highlight).map((s) => s.title)).toEqual(["Teste vermelho"]);
  });
});

describe("homeContent.contact", () => {
  const { contact } = homeContent;

  it("has the section id, eyebrow, title and lead", () => {
    expect(contact.sectionId).toBe("contato");
    expect(contact.eyebrow).toBe("05 · Contato");
    expect(contact.title).toBe("Vamos conversar");
    expect(contact.lead).toBe("Para vaga ou projeto, escolha o canal.");
  });

  it("has the CV download link", () => {
    expect(contact.cv).toEqual({ label: "Baixar CV", href: "/cv-rafael-couto-silva.pdf" });
  });

  it("has the external WhatsApp button link", () => {
    expect(contact.whatsapp).toEqual({
      label: "Chamar no WhatsApp",
      href: "https://wa.me/5524999644346",
      external: true,
    });
  });

  it("has the six cards verbatim, in order", () => {
    expect(contact.cards).toEqual([
      { icon: "mail", label: "E-mail", value: "rafacsilva016@gmail.com", href: "mailto:rafacsilva016@gmail.com" },
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
      {
        icon: "whatsapp",
        label: "WhatsApp",
        value: "Abrir conversa",
        href: "https://wa.me/5524999644346",
        external: true,
      },
    ]);
  });

  it("never contains the design review marker '[conferir'", () => {
    expect(JSON.stringify(contact)).not.toContain("[conferir");
  });
});
