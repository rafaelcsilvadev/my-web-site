import { HomeView } from "@/components/HomeView";
import { homeContent } from "@/content/home";
import { siteContent } from "@/content/site";

export default function Page() {
  return <HomeView content={homeContent} brand={siteContent.name} />;
}
