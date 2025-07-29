import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="canonical" href="https://snehashisgharai.me" />
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
              url: "https://snehashisgharai.me",
              image: "https://snehashisgharai.me/images/hero-image.png",
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
