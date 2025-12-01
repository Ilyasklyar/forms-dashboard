import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myapp.com";

export const metadata: Metadata = {
  title: "Forms Dashboard App",
  description:
    "Manage forms easily with role-based access, create, edit, and view statuses.",
  keywords: ["forms", "dashboard", "form management"],
  openGraph: {
    title: "Forms Dashboard App",
    description:
      "Manage forms easily with role-based access, create, edit, and view statuses.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/hero.webp`,
        width: 1200,
        height: 630,
        alt: "Forms Dashboard App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forms Dashboard App",
    description:
      "Manage forms easily with role-based access, create, edit, and view statuses.",
    images: [`${siteUrl}/images/hero.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
