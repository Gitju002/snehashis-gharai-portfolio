import React from "react";
import Head from "next/head";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Snehashis Gharai | Frontend Developer & Designer Portfolio
        </title>
        <meta
          name="description"
          content="Snehashis Gharai - Frontend Developer & Designer from India. Currently Jr. Web Developer at Runtime Solutions. Specializing in React.js, Next.js, TypeScript, and modern web technologies."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Snehashis Gharai, Frontend Developer, Web Developer, React Developer, Next.js Developer, TypeScript Developer, UI/UX Designer, Portfolio, India, Web Design, JavaScript, Tailwind CSS, MongoDB, Full Stack Developer"
        />
        <meta name="author" content="Snehashis Gharai" />
        <meta name="creator" content="Snehashis Gharai" />
        <meta name="publisher" content="Snehashis Gharai" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://snehashisgharai.me" />
        <meta
          property="og:title"
          content="Snehashis Gharai | Frontend Developer & Designer Portfolio"
        />
        <meta
          property="og:description"
          content="Snehashis Gharai - Frontend Developer & Designer from India. Helping brands stand out in the digital world with React.js, Next.js, and modern web technologies."
        />
        <meta property="og:site_name" content="Snehashis Gharai Portfolio" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Snehashis Gharai - Frontend Developer & Designer Portfolio"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Snehashis Gharai | Frontend Developer & Designer"
        />
        <meta
          name="twitter:description"
          content="Frontend Developer & Designer from India. Specializing in React.js, Next.js, and modern web technologies."
        />
        <meta name="twitter:site" content="@snehashis_ai" />
        <meta name="twitter:creator" content="@snehashis_ai" />
        <meta name="twitter:image" content="/images/og-image.jpg" />

        <link rel="canonical" href="https://snehashisgharai.me" />
      </Head>

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
    </>
  );
}
