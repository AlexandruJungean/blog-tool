import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "./i18n/LanguageProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "The Tool Connect Guide: Local Services, Expat Life & Real Stories",
    template: "%s | Tool Connect Blog",
  },
  description:
    "Practical guides for expats living in Czechia and for local service providers who want to reach them. Real stories, fair pricing, and tips that build trust on both sides.",
  metadataBase: new URL("https://blog.tool-connect.com"),
  openGraph: {
    title: "The Tool Connect Guide: Local Services, Expat Life & Real Stories",
    description:
      "Practical guides for expats living in Czechia and for local service providers who want to reach them. Real stories, fair pricing, and tips that build trust on both sides.",
    url: "https://blog.tool-connect.com",
    siteName: "Tool Connect Blog",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Tool Connect Blog",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tool Connect Guide: Local Services, Expat Life & Real Stories",
    description:
      "Practical guides for expats living in Czechia and for local service providers who want to reach them. Real stories, fair pricing, and tips that build trust on both sides.",
    images: ["/og-image.webp"],
  },
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

