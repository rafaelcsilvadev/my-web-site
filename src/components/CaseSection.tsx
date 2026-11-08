import type { ReactNode } from "react";

type CaseSectionProps = {
  id: string;
  number: string;
  title: string;
  layout: "split" | "stacked";
  intro?: string;
  children: ReactNode;
};

const LAYOUT_CLASS = {
  split: "grid gap-10 lg:grid-cols-2 lg:gap-16",
  stacked: "flex flex-col gap-10",
} as const;

export function CaseSection({ id, number, title, layout, intro, children }: CaseSectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-24"
    >
      <div className={LAYOUT_CLASS[layout]}>
        <div>
          <span aria-hidden="true" className="font-mono text-xs uppercase tracking-widest text-brand-text">
            {number}
          </span>
          <h2 id={headingId} className="mt-3 text-3xl font-bold text-fg md:text-4xl">
            {title}
          </h2>
          {intro !== undefined && <p className="mt-4 text-lg text-fg-muted">{intro}</p>}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
