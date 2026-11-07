import { ButtonLink } from "@/components/ButtonLink";
import { MethodStep } from "@/components/MethodStep";
import { SectionHeading } from "@/components/SectionHeading";
import type { HomeContent } from "@/models/home-content";

type MethodSectionProps = {
  method: HomeContent["method"];
};

export function MethodSection({ method }: MethodSectionProps) {
  const { sectionId, eyebrow, title, intro, humanLabel, aiLabel, steps, summary, link } = method;
  const headingId = `${sectionId}-heading`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeading eyebrow={eyebrow} title={title} id={headingId} />
      <p className="mt-4 max-w-3xl text-fg-muted">{intro}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <MethodStep key={step.number} step={step} humanLabel={humanLabel} aiLabel={aiLabel} />
        ))}
      </div>
      <p className="mt-10 font-mono text-sm text-fg-muted">{summary}</p>
      <div className="mt-6">
        <ButtonLink link={link} variant="ghost" />
      </div>
    </section>
  );
}
