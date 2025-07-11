import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/components/navigation/Navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const testManuka = localFont({
  src: [
    {
      path: "../public/fonts/TestManuka-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TestManuka-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-test-manuka",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://snehashisgharai.me"),
  title: "Snehashis Gharai | Frontend Developer & Designer Portfolio",
  description:
    "Snehashis Gharai - Frontend Developer & Designer from India. Helping brands stand out in the digital world with React.js, Next.js, TypeScript, and modern web technologies. Portfolio showcasing web development projects and design work.",
  keywords: [
    "Snehashis Gharai",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "UI/UX Designer",
    "Portfolio",
    "India",
    "Web Design",
    "JavaScript",
    "Tailwind CSS",
    "MongoDB",
    "Full Stack Developer",
  ],
  authors: [{ name: "Snehashis Gharai", url: "https://snehashisgharai.me" }],
  creator: "Snehashis Gharai",
  publisher: "Snehashis Gharai",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snehashisgharai.me",
    title: "Snehashis Gharai | Frontend Developer & Designer Portfolio",
    description:
      "Snehashis Gharai - Frontend Developer & Designer from India. Helping brands stand out in the digital world with React.js, Next.js, and modern web technologies.",
    siteName: "Snehashis Gharai Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Snehashis Gharai - Frontend Developer & Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snehashis Gharai | Frontend Developer & Designer",
    description:
      "Frontend Developer & Designer from India. Specializing in React.js, Next.js, and modern web technologies.",
    site: "@snehashis_ai",
    creator: "@snehashis_ai",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://snehashisgharai.me",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://snehashisgharai.me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111212" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Snehashis Gharai",
              url: "https://snehashisgharai.me", // Updated
              image: "https://snehashisgharai.me/images/hero-image.png", // Updated
              jobTitle: "Frontend Developer & Designer",
              worksFor: {
                "@type": "Organization",
                name: "Runtime Solutions Pvt. Ltd.",
              },
              alumniOf: "Various Tech Companies",
              knowsAbout: [
                "Frontend Development",
                "React.js",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Web Design",
                "UI/UX Design",
                "Tailwind CSS",
                "MongoDB",
                "Node.js",
              ],
              sameAs: [
                "https://github.com/gitju002",
                "https://www.linkedin.com/in/snehashis-ai",
                "https://www.instagram.com/snehashis_ai",
                "https://x.com/snehashis_ai",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "India",
              },
              email: "connectsnehashis22@gmail.com",
              telephone: "+91 8420250470",
            }),
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${testManuka.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
