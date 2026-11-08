import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseView } from "@/components/CaseView";
import { caseChrome } from "@/content/case-chrome";
import { caseSlugs, cases } from "@/content/cases";
import { siteContent } from "@/content/site";
import { normalizeSiteUrl } from "@/services/site-url";
import { findCase } from "@/viewmodels/case-view-model";
import { buildCaseMetadata } from "../case-metadata";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

async function loadCase(params: CasePageProps["params"]) {
  const { slug } = await params;
  const entry = findCase(cases, slug);
  if (!entry) notFound();
  return entry;
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const entry = await loadCase(params);
  return buildCaseMetadata(entry, normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL));
}

export default async function CasePage({ params }: CasePageProps) {
  const entry = await loadCase(params);
  return <CaseView content={entry} chrome={caseChrome} brand={siteContent.name} />;
}
