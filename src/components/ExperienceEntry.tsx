import { Chip } from "@/components/Chip";
import type { ExperienceEntry as ExperienceEntryModel } from "@/models/home-content";
import { hasItems, toExperienceEntryView } from "@/viewmodels/home-view-model";

type ExperienceEntryProps = {
  entry: ExperienceEntryModel;
};

export function ExperienceEntry({ entry }: ExperienceEntryProps) {
  const { company, companyDetail, period, duration, role, achievements, tags, mainTags, note, link } =
    toExperienceEntryView(entry);

  return (
    <article className="relative flex flex-col gap-3 pl-8">
      <span
        aria-hidden="true"
        className="absolute -left-[7px] top-2 size-3.5 rounded-full border-2 border-brand-text bg-bg shadow-[0_0_0_4px_rgb(136_30_155/0.2)]"
      />
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h3 className="text-2xl font-bold text-fg">
          {company}
          {companyDetail ? (
            <span className="font-normal text-fg-muted"> {companyDetail}</span>
          ) : null}
        </h3>
        {duration ? (
          <span data-duration className="font-mono text-xs text-brand-light">
            {duration}
          </span>
        ) : null}
        {period ? (
          <span
            data-period
            className="rounded-md border border-brand-text/40 bg-brand/15 px-2 py-0.5 font-mono text-xs text-brand-light"
          >
            {period}
          </span>
        ) : null}
      </div>
      <p className="font-mono text-xs text-fg-muted">{role}</p>
      {achievements.map(({ lead, text }) => (
        <p key={`${lead ?? ""}${text}`} className="text-fg-muted">
          {lead ? <strong className="font-semibold text-fg">{lead} </strong> : null}
          {text}
        </p>
      ))}
      {hasItems(tags) ? (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Chip label={tag} main={mainTags.includes(tag)} />
            </li>
          ))}
        </ul>
      ) : null}
      {note ? <p className="font-mono text-xs text-fg-muted">{note}</p> : null}
      {link ? (
        <a
          href={link.href}
          className="w-fit text-sm font-semibold text-brand-light underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
        >
          {link.label}
        </a>
      ) : null}
    </article>
  );
}
