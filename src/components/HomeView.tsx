import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { MethodSection } from "@/components/MethodSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { StackSection } from "@/components/StackSection";
import type { HomeContent } from "@/models/home-content";

type HomeViewProps = {
  content: HomeContent;
  brand: string;
};

export function HomeView({ content, brand }: HomeViewProps) {
  const { chrome } = content;

  return (
    <div id={chrome.topId} className="home-backdrop min-h-screen">
      <SkipLink label={chrome.skipLinkLabel} targetId={chrome.mainId} />
      <SiteHeader brand={brand} chrome={chrome} />
      <main id={chrome.mainId}>
        <Hero hero={content.hero} />
        <ProjectsSection projects={content.projects} />
        <ExperienceSection experience={content.experience} />
        <StackSection stack={content.stack} />
        <MethodSection method={content.method} />
        <ContactSection contact={content.contact} />
      </main>
      <SiteFooter footer={chrome.footer} />
    </div>
  );
}
