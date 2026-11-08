import { BackLink } from "@/components/BackLink";
import { CaseCallout } from "@/components/CaseCallout";
import { CaseCardList } from "@/components/CaseCardList";
import { CaseClosing } from "@/components/CaseClosing";
import { CaseFacts } from "@/components/CaseFacts";
import { CaseFigure } from "@/components/CaseFigure";
import { CaseHero } from "@/components/CaseHero";
import { CaseHighlights } from "@/components/CaseHighlights";
import { CaseMetrics } from "@/components/CaseMetrics";
import { CaseSection } from "@/components/CaseSection";
import { CaseStack } from "@/components/CaseStack";
import { CaseSteps } from "@/components/CaseSteps";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import type { CaseBlock, CaseContent } from "@/models/case-content";
import type { HomeContent } from "@/models/home-content";

type CaseViewProps = {
  content: CaseContent;
  chrome: HomeContent["chrome"];
  brand: string;
};

function CaseBlockView({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case "paragraphs":
      return (
        <div className="flex flex-col gap-4">
          {block.items.map((text) => (
            <p key={text} className="m-0 text-base leading-relaxed text-fg-muted">
              {text}
            </p>
          ))}
        </div>
      );
    case "callout":
      return <CaseCallout label={block.label} items={block.items} />;
    case "metrics":
      return <CaseMetrics items={block.items} />;
    case "cards":
      return <CaseCardList items={block.items} />;
    case "steps":
      return <CaseSteps items={block.items} />;
    case "highlights":
      return <CaseHighlights items={block.items} />;
    case "figure":
      return (
        <CaseFigure
          src={block.src}
          width={block.width}
          height={block.height}
          alt={block.alt}
          caption={block.caption}
        />
      );
  }
}

export function CaseView({ content, chrome, brand }: CaseViewProps) {
  return (
    <div id={chrome.topId} className="home-backdrop min-h-screen">
      <SkipLink label={chrome.skipLinkLabel} targetId={chrome.mainId} />
      <SiteHeader brand={brand} chrome={chrome} />
      <main id={chrome.mainId}>
        <div className="mx-auto w-full max-w-[1160px] px-[clamp(16px,5vw,48px)] pt-8">
          <BackLink link={content.backLink} />
        </div>
        <CaseHero
          eyebrow={content.eyebrow}
          title={content.title}
          intro={content.intro}
          actions={content.heroActions}
        />
        <CaseFacts facts={content.facts} />
        {content.sections.map((section) => (
          <CaseSection
            key={section.id}
            id={section.id}
            number={section.number}
            title={section.title}
            layout={section.layout}
            intro={section.intro}
          >
            <div className="flex flex-col gap-8">
              {section.blocks.map((block, index) => (
                <CaseBlockView key={`${block.kind}-${index}`} block={block} />
              ))}
            </div>
          </CaseSection>
        ))}
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <CaseStack stack={content.stack} />
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
          <CaseClosing
            eyebrow={content.closing.eyebrow}
            title={content.closing.title}
            text={content.closing.text}
            actions={content.closing.actions}
          />
        </div>
      </main>
      <SiteFooter footer={chrome.footer} />
    </div>
  );
}
