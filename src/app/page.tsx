import { HomePlaceholder } from "@/components/HomePlaceholder";
import { siteContent } from "@/content/site";

export default function Page() {
  return <HomePlaceholder title={siteContent.name} />;
}
