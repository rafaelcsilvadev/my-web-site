import { ButtonLink } from "@/components/ButtonLink";
import { ContactCard } from "@/components/ContactCard";
import { SectionHeading } from "@/components/SectionHeading";
import type { HomeContent } from "@/models/home-content";

type ContactSectionProps = {
  contact: HomeContent["contact"];
};

export function ContactSection({ contact }: ContactSectionProps) {
  const { sectionId, eyebrow, title, lead, cv, whatsapp, cards } = contact;
  const headingId = `${sectionId}-heading`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeading eyebrow={eyebrow} title={title} id={headingId} />
      <p className="mt-4 max-w-3xl text-fg-muted">{lead}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <ButtonLink link={cv} variant="primary" icon="download" download />
        <ButtonLink link={whatsapp} variant="ghost" icon="whatsapp" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <ContactCard key={card.icon} {...card} />
        ))}
      </div>
    </section>
  );
}
