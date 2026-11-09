import { Chip } from "@/components/Chip";
import { Icon } from "@/components/Icon";
import type { ProjectItem } from "@/models/home-content";

type ProjectCardProps = {
  project: ProjectItem;
};

const ARTICLE_LAYOUT_CLASS = {
  default: "",
  wide: " md:col-span-2 md:grid md:grid-cols-2 md:gap-x-10",
} as const;

const BODY_LAYOUT_CLASS = {
  default: "contents",
  wide: "flex flex-col gap-5",
} as const;

export function ProjectCard({ project }: ProjectCardProps) {
  const { context, title, description, metrics, metricsStyle, layout, tags, mainTags, caseLink, repoLink } =
    project;
  const isNumber = metricsStyle === "number";
  const isRows = metricsStyle === "rows";
  const layoutKey = layout ?? "default";
  const [category, kind] = context;

  const metricsList =
    metrics.length === 0 ? null : isRows ? (
      <dl className="flex flex-col gap-3 border-t border-line pt-4 md:self-center md:border-l md:border-t-0 md:pl-10 md:pt-0">
        {metrics.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0"
          >
            <dt className="font-mono text-[11px] text-fg-muted">{label}</dt>
            <dd className="text-sm font-bold text-fg">{value}</dd>
          </div>
        ))}
      </dl>
    ) : (
      <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-4">
          {metrics.map(({ label, value }) => (
            <div key={label} className={`flex ${isNumber ? "flex-col-reverse" : "flex-col"} gap-1`}>
              <dt className={isNumber ? "text-xs text-fg-muted" : "font-mono text-[11px] text-fg-muted"}>
                {label}
              </dt>
              <dd className={isNumber ? "font-mono text-xl font-bold text-brand-light" : "text-sm font-bold text-fg"}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
    );

  return (
    <article
      className={`card-glow relative flex flex-col gap-5 rounded-xl border border-line bg-linear-to-b from-card-from to-card-to p-6${ARTICLE_LAYOUT_CLASS[layoutKey]}`}
    >
      <div className={BODY_LAYOUT_CLASS[layoutKey]}>
        <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
          <span className="uppercase tracking-wider text-brand-text">{category}</span>
          <span className="text-fg-muted">{kind}</span>
        </div>
        <h3 className="text-2xl font-bold text-fg">{title}</h3>
        <p className="text-[15px] leading-relaxed text-fg-muted">{description}</p>
        {isRows ? null : metricsList}
        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2 border-t border-line pt-4">
            {tags.map((tag) => (
              <li key={tag}>
                <Chip label={tag} main={mainTags.includes(tag)} />
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-1">
          <a
            href={caseLink.href}
            className="inline-flex items-center gap-2 rounded-lg border border-brand/50 px-5 py-3 text-sm font-semibold text-fg after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
          >
            {caseLink.label}
            <Icon name="arrow" className="size-4" />
          </a>
          {repoLink ? (
            <a
              href={repoLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 text-sm font-semibold text-brand-light underline underline-offset-4"
            >
              {repoLink.label}
            </a>
          ) : null}
        </div>
      </div>
      {isRows ? metricsList : null}
    </article>
  );
}
