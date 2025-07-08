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
    // Add more font variations as needed
  ],
  variable: "--font-test-manuka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snehashis Gharai | Portfolio",
  description:
    "Helping brands stand out in the digital world. I bring fresh ideas, a hands-on approach, and a passion for creating bold, meaningful work. No fluff — just real results, built together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${testManuka.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
