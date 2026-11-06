export interface SiteContent {
  name: string;
  title: string;
  description: string;
  ogImageAlt: string;
  notFound: { title: string; message: string; backLabel: string };
}
