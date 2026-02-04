import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://improved-solution.vercel.app"),
  title: {
    default: "Improved Solutions",
    template: "%s — Improved Solutions",
  },
  description:
    "Premium multidisciplinary studio delivering publishing, branding, graphic design, websites, applications, and premium printing with clarity and finished execution.",
  applicationName: "Improved Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Improved Solutions",
    title: "Improved Solutions",
    description:
      "Premium multidisciplinary studio delivering publishing, branding, graphic design, websites, applications, and premium printing with clarity and finished execution.",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Improved Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Improved Solutions",
    description:
      "Premium multidisciplinary studio delivering publishing, branding, graphic design, websites, applications, and premium printing with clarity and finished execution.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#0b0f14", color: "#f5f7fa" }}
      >
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
