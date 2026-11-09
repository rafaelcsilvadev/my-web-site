import { Chip } from "@/components/Chip";
import { SectionHeading } from "@/components/SectionHeading";
import type { HomeContent } from "@/models/home-content";

type StackSectionProps = {
  stack: HomeContent["stack"];
};

export function StackSection({ stack }: StackSectionProps) {
  const { sectionId, eyebrow, title, main, otherLabel, others, mainOthers } = stack;
  const headingId = `${sectionId}-heading`;
  const othersLabelId = `${sectionId}-others-label`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeading eyebrow={eyebrow} title={title} id={headingId} />
      <ul className="mt-10 grid max-w-[820px] gap-4 md:grid-cols-3">
        {main.map((item) => (
          <li
            key={item.name}
            className="card-glow flex flex-col items-start gap-3 rounded-xl border border-line bg-linear-to-b from-card-from to-card-to p-6"
          >
            <span className="font-mono text-2xl font-bold text-brand-light">{item.name}</span>
            <span className="text-sm text-fg-muted">{item.note}</span>
          </li>
        ))}
      </ul>
      {others.length > 0 && (
        <div className="mt-10">
          <p id={othersLabelId} className="font-mono text-xs text-fg-muted">
            {otherLabel}
          </p>
          <ul aria-labelledby={othersLabelId} className="mt-3 flex flex-wrap gap-2">
            {others.map((name) => (
              <li key={name}>
                <Chip label={name} main={mainOthers.includes(name)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
