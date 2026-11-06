import { NotFoundView } from "@/components/NotFoundView";
import { siteContent } from "@/content/site";

export default function NotFound() {
  return <NotFoundView {...siteContent.notFound} />;
}
