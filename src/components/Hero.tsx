import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import type { HomeContent } from "@/models/home-content";

type HeroProps = {
  hero: HomeContent["hero"];
};

export function Hero({ hero }: HeroProps) {
  const { label, headline, badge, intro, stackLine, actions, portrait } = hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid w-full max-w-[1160px] items-center gap-14 px-[clamp(16px,5vw,48px)] py-[clamp(40px,6vw,88px)] md:grid-cols-2"
    >
      <div className="flex flex-col items-start gap-[26px]">
        <p className="font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-brand-text">{label}</p>
        <h1
          id="hero-title"
          className="m-0 text-[clamp(38px,6vw,68px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-fg"
        >
          {headline.lead} <span className="block text-brand-text">{headline.accent}</span>
        </h1>
        <p className="flex flex-wrap items-center gap-3 rounded-[10px] border border-brand-text/35 bg-brand/12 px-3.5 py-2.5">
          <span className="border-r border-brand-text/40 pr-3 font-mono text-[13px] font-semibold text-brand-light">
            {badge.label}
          </span>
          <span className="text-base font-semibold text-fg">{badge.text}</span>
        </p>
        <p className="m-0 max-w-[560px] text-[19px] text-fg-muted">{intro}</p>
        <p className="m-0 font-mono text-sm text-[#CFCBDD]">
          {stackLine.map((item, index) => (
            <span key={item}>
              {index > 0 ? <span className="text-brand-text"> · </span> : null}
              {item}
            </span>
          ))}
        </p>
        <div className="flex flex-wrap gap-3.5">
          <ButtonLink link={actions.contact} variant="primary" icon="arrow" />
          <ButtonLink link={actions.cv} variant="ghost" icon="download" download />
        </div>
      </div>
      <figure className="m-0 flex flex-col items-center gap-[30px]">
        <div className="relative aspect-square w-full max-w-[360px] rounded-full border border-brand-text/65 shadow-[0_0_0_8px_rgb(136_30_155/0.08),0_0_90px_rgb(136_30_155/0.45)] after:pointer-events-none after:absolute after:-inset-[18px] after:rounded-full after:border after:border-dashed after:border-brand-text/30 after:content-['']">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 768px) 360px, 80vw"
            priority
            className="size-full rounded-full object-cover object-[50%_30%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,transparent_58%,rgb(11_11_16/0.5)_100%)]"
          />
        </div>
        <figcaption className="text-sm text-fg-muted">{portrait.caption}</figcaption>
      </figure>
    </section>
  );
}
