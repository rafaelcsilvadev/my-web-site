import { ExperienceEntry } from "@/components/ExperienceEntry";
import { SectionHeading } from "@/components/SectionHeading";
import type { HomeContent } from "@/models/home-content";

type ExperienceSectionProps = {
  experience: HomeContent["experience"];
};

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const { sectionId, eyebrow, title, entries } = experience;
  const headingId = `${sectionId}-heading`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeading eyebrow={eyebrow} title={title} id={headingId} />
      <div className="mt-10 flex flex-col gap-14 border-l border-line">
        {entries.map((entry) => (
          <ExperienceEntry key={entry.company} entry={entry} />
        ))}
      </div>
    </section>
  );
}
