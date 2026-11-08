import { HomeView } from "@/components/HomeView";
import { homeContent } from "@/content/home";
import { siteContent } from "@/content/site";
import { buildPersonJsonLd } from "@/services/person-json-ld";
import { normalizeSiteUrl } from "@/services/site-url";

const PROFILE_ICONS = ["linkedin", "github", "youtube", "instagram"];

export default function Page() {
  const jsonLd = buildPersonJsonLd({
    name: siteContent.name,
    jobTitle: homeContent.hero.headline.lead,
    description: siteContent.description,
    siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
    sameAs: homeContent.contact.cards
      .filter((card) => PROFILE_ICONS.includes(card.icon))
      .map((card) => card.href),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeView content={homeContent} brand={siteContent.name} />
    </>
  );
}
