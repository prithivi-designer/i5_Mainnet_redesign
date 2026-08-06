import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import AppShell from "@/components/layout/AppShell";

/* ----------------------------------------------------------
   Fonts
   ---------------------------------------------------------- */
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ----------------------------------------------------------
   Metadata
   ---------------------------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: "i5 — Crypto & Stocks Trading",
    template: "%s | i5",
  },
  description:
    "Professional-grade crypto and stocks trading platform. Real-time data, advanced charts, and institutional-quality tooling.",
  keywords: ["crypto", "stocks", "trading", "markets", "portfolio"],
  authors: [{ name: "i5 Mainnet" }],
  themeColor: "#05090A",
};

/* ----------------------------------------------------------
   Root Layout
   ---------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
