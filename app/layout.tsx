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

export const metadata: Metadata = {
  title: "Ellen Gardelin | Alisamentos & Tratamentos Capilares",
  description:
    "Especialista em alisamentos orgânicos, tratamentos capilares e cursos profissionais em Itápolis - SP.",
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
