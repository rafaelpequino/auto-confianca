import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import CHeader from "@/components/CHeader";
import CFooter from "@/components/CFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quaddra Lorena – Yuny | Auto Confiança",
  description:
    "O novo ícone de luxo da Yuny nos Jardins. Por Aflalo & Gasperini. Apenas 56 unidades no maior terreno do Jardins (5.414m²). 4 suítes | 300 a 387 m².",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white relative`}
      >
        <CHeader />
        {children}
        <CFooter />
      </body>
    </html>
  );
}
