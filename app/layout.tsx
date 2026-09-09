import type { Metadata } from "next";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const siteUrl = "https://salon-page-gold.vercel.app";
const ogImage = "/images/og-image.png";
const description =
  "Especialista em alisamentos orgânicos, tratamentos capilares e cursos profissionais em Itápolis - SP.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ellen Gardelin | Alisamentos & Tratamentos Capilares",
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Ellen Gardelin",
    title: "Ellen Gardelin | Alisamentos & Tratamentos Capilares",
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Ellen Gardelin — beleza que transforma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ellen Gardelin | Alisamentos & Tratamentos Capilares",
    description,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
