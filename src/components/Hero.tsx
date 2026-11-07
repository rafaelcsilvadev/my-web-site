import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import type { HomeContent } from "@/models/home-content";

type HeroProps = {
  hero: HomeContent["hero"];
};

export function Hero({ hero }: HeroProps) {
  const { label, headline, badge, intro, stackLine, actions, portrait } = hero;

  return (
    <section aria-labelledby="hero-title" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div className="flex flex-col items-start gap-6">
        <p className="font-mono text-sm text-brand-light">{label}</p>
        <h1 id="hero-title" className="text-4xl font-extrabold tracking-tight text-fg md:text-5xl">{headline}</h1>
        <p className="flex items-center gap-3 text-sm text-fg-muted">
          <span className="rounded-full border border-brand-text px-3 py-1 font-mono text-xs text-brand-light">
            {badge.label}
          </span>
          <span>{badge.text}</span>
        </p>
        <p className="text-lg text-fg-muted">{intro}</p>
        <p className="font-mono text-sm text-fg-muted">{stackLine.join(" · ")}</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink link={actions.contact} variant="primary" />
          <ButtonLink link={actions.cv} variant="ghost" icon="download" download />
        </div>
      </div>
      <figure className="flex flex-col items-center gap-3">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          sizes="(min-width: 768px) 360px, 80vw"
          priority
          className="h-auto w-full max-w-[360px] rounded-2xl"
        />
        <figcaption className="text-xs text-fg-muted">{portrait.caption}</figcaption>
      </figure>
    </section>
  );
}
