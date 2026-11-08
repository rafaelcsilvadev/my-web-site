export interface PersonJsonLdInput {
  name: string;
  jobTitle: string;
  description: string;
  siteUrl: string;
  sameAs: string[];
}

export function buildPersonJsonLd(input: PersonJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    url: `${input.siteUrl}/`,
    image: `${input.siteUrl}/rafael-portrait.png`,
    sameAs: input.sameAs,
  };
}
