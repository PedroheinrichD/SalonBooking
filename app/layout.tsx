import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
// @ts-ignore: Importing global CSS (no module declarations for .css files)
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ateliê Fio & Ouro — Agendamento",
  description: "Agende seu horário no salão em poucos cliques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} font-body bg-bg text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
