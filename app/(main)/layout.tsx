import type { Metadata } from "next";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase:
    new URL(siteUrl),

  title: {
    default:
      "Malathi Designer | Ladies Tailoring in Namakkal",

    template:
      "%s | Malathi Designer"
  },

  description:
    "Ladies tailoring, blouse stitching, custom dress stitching, alterations and personalised fitting services in Kondamanayakkanpatti, Namakkal.",

  alternates: {
    canonical: "/"
  },

  openGraph: {
    title:
      "Malathi Designer | Your Style, Perfectly Stitched.",

    description:
      "Beautifully crafted outfits, personalised fitting and thoughtful stitching designed to make every piece feel uniquely yours.",

    url: siteUrl,

    siteName:
      "Malathi Designer",

    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}