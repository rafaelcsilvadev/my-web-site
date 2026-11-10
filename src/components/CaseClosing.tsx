import { ButtonLink } from "@/components/ButtonLink";
import type { CaseClosing as CaseClosingModel } from "@/models/case-content";

type CaseClosingProps = CaseClosingModel;

export function CaseClosing({ eyebrow, title, text, actions, next }: CaseClosingProps) {
  return (
    <section
      aria-labelledby="case-closing-title"
      className="flex flex-col items-start gap-5 rounded-2xl border border-line bg-[radial-gradient(ellipse_at_top_right,rgb(136_30_155/0.28),transparent_60%),linear-gradient(to_bottom,var(--color-card-from),var(--color-card-to))] p-[clamp(24px,5vw,48px)]"
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
        <div className="mt-2 flex flex-wrap items-center gap-3">
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
      {next ? (
        <>
          <hr className="m-0 mt-2 w-full border-0 border-t border-line" />
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="m-0 font-mono text-xs uppercase tracking-widest text-brand-text">
                {next.eyebrow}
              </p>
              <p className="m-0 text-xl font-bold text-fg">{next.title}</p>
            </div>
            <ButtonLink
              link={next.action.link}
              variant={next.action.variant}
              icon={next.action.icon}
              download={next.action.download}
            />
          </div>
        </>
      ) : null}
    </section>
  );
}
