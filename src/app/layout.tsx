import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "realestat333 — Real Estate, Elevated",
    template: "%s — realestat333",
  },
  description:
    "realestat333 is an established real estate company serving buyers, sellers, investors, and renters with exceptional guidance, modern tools, and local expertise.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
