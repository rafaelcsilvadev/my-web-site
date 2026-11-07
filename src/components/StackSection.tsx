import { Chip } from "@/components/Chip";
import { SectionHeading } from "@/components/SectionHeading";
import type { HomeContent } from "@/models/home-content";

type StackSectionProps = {
  stack: HomeContent["stack"];
};

export function StackSection({ stack }: StackSectionProps) {
  const { sectionId, eyebrow, title, main, otherLabel, others } = stack;
  const headingId = `${sectionId}-heading`;
  const othersLabelId = `${sectionId}-others-label`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeading eyebrow={eyebrow} title={title} id={headingId} />
      <ul className="mt-10 flex flex-wrap gap-6">
        {main.map((item) => (
          <li key={item.name} className="flex flex-col items-start gap-2">
            <Chip label={item.name} main />
            <span className="font-mono text-xs text-fg-muted">{item.note}</span>
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
                <Chip label={name} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
