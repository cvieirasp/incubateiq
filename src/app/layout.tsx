import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

import "./globals.css";
import "easymde/dist/easymde.min.css";

const roboto = Roboto_Mono({
  weight: ["100", "300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Incubate IQ",
  description: "Apresente, vote e desenvolva suas ideias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} font-sans`}>{children}</body>
    </html>
  );
}
