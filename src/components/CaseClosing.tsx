import { ButtonLink } from "@/components/ButtonLink";
import type { CaseClosing as CaseClosingModel } from "@/models/case-content";

type CaseClosingProps = CaseClosingModel;

export function CaseClosing({ eyebrow, title, text, actions }: CaseClosingProps) {
  return (
    <section
      aria-labelledby="case-closing-title"
      className="flex flex-col items-start gap-5 rounded-2xl border border-brand-text/30 bg-brand/10 p-[clamp(24px,5vw,48px)]"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-brand-text">{eyebrow}</p>
      <h2
        id="case-closing-title"
        className="m-0 text-[clamp(28px,4vw,40px)] font-extrabold leading-tight tracking-[-0.02em] text-fg"
      >
        {title}
      </h2>
      <p className="m-0 max-w-[560px] text-[17px] text-fg-muted">{text}</p>
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
