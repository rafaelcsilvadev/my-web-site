import type { ReactNode } from "react";
import { siteContent } from "@/content/site";
import { normalizeSiteUrl } from "@/services/site-url";
import { jetbrainsMono, manrope } from "./fonts";
import "./globals.css";
import { buildSiteMetadata, siteViewport } from "./site-metadata";

export const metadata = buildSiteMetadata(
  siteContent,
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
);

export const viewport = siteViewport;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
