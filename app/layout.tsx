import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const description =
    "Descubra em cerca de 90 segundos qual área da sua vida pede atenção primeiro e receba três ações práticas.";
  const imageUrl = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: {
      default: "A Regra é Clara",
      template: "%s | A Regra é Clara",
    },
    description,
    openGraph: {
      title: "A Regra é Clara",
      description,
      type: "website",
      locale: "pt_BR",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "A Regra é Clara — diagnóstico gratuito" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "A Regra é Clara",
      description,
      images: [imageUrl],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#19211f",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
