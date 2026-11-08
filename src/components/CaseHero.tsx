import { ButtonLink } from "@/components/ButtonLink";
import type { CaseAction } from "@/models/case-content";

type CaseHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  actions: CaseAction[];
};

export function CaseHero({ eyebrow, title, intro, actions }: CaseHeroProps) {
  return (
    <section
      aria-labelledby="case-title"
      className="mx-auto flex w-full max-w-[1160px] flex-col items-start gap-[26px] px-[clamp(16px,5vw,48px)] py-[clamp(40px,6vw,88px)]"
    >
      <p className="font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-brand-text">
        {eyebrow}
      </p>
      <h1
        id="case-title"
        className="m-0 text-[clamp(38px,6vw,68px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-fg"
      >
        {title}
      </h1>
      <p className="m-0 max-w-[560px] text-[19px] text-fg-muted">{intro}</p>
      {actions.length > 0 ? (
        <div className="flex flex-wrap gap-3.5">
          {actions.map((action) => (
            <ButtonLink
              key={action.link.href}
              link={action.link}
              variant={action.variant}
              icon={action.icon}
              download={action.download}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
