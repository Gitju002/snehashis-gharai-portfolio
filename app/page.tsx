import React from "react";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Skills from "@/app/components/Skills";
import Projects from "@/app/components/Projects";
import Experience from "@/app/components/Experience";
import Footer from "@/app/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snehashis Gharai | Frontend Developer & Designer Portfolio",
  description:
    "Snehashis Gharai - Frontend Developer & Designer from India. Currently Jr. Web Developer at Runtime Solutions. Specializing in React.js, Next.js, TypeScript, and modern web technologies.",
  openGraph: {
    title: "Snehashis Gharai | Frontend Developer & Designer",
    description:
      "Frontend Developer & Designer from India. Currently Jr. Web Developer at Runtime Solutions. Specializing in React.js, Next.js, and modern web technologies.",
    url: "https://snehashisgharai.me",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Snehashis Gharai Portfolio Homepage",
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      {/* Hidden SEO content */}
      <div style={{ display: "none" }}>
        <h1>Snehashis Gharai - Frontend Developer and Designer</h1>
        <p>
          Snehashis Gharai is a talented Frontend Developer and Designer from
          India, currently working as Jr. Web Developer at Runtime Solutions
          Pvt. Ltd. Specializing in React.js, Next.js, TypeScript, JavaScript,
          and modern web technologies.
        </p>
      </div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Footer />
    </main>
  );
}
