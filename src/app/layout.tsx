import type { Metadata, Viewport } from "next";
import { DM_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const description =
  "pretty good coffee, roasted in philly. a little coffee cart, and three bags to take home. leave your email and we'll tell you when the cart is out.";

export const metadata: Metadata = {
  metadataBase: new URL("https://doodlecoffee.shop"),
  title: "doodle · pretty good coffee, roasted in philly",
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "doodle · pretty good coffee",
    description,
    url: "/",
    siteName: "doodle",
    images: [{ url: "/og-wordmark.png" }],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4F57D6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
