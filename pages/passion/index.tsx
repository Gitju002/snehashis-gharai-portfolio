import React from "react";
import Head from "next/head";
import VStack from "@/components/layout/VStack";
import Container from "@/components/layout/Container";

export default function Passion() {
  return (
    <>
      <Head>
        <title>Passion Projects | Snehashis Gharai</title>
        <meta
          name="description"
          content="Explore the passion projects and personal interests of Snehashis Gharai - Frontend Developer & Designer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://snehashisgharai.me/passion" />
        <meta
          property="og:title"
          content="Passion Projects | Snehashis Gharai"
        />
        <meta
          property="og:description"
          content="Explore the passion projects and personal interests of Snehashis Gharai - Frontend Developer & Designer."
        />
        <meta property="og:site_name" content="Snehashis Gharai Portfolio" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Snehashis Gharai - Passion Projects"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Passion Projects | Snehashis Gharai"
        />
        <meta
          name="twitter:description"
          content="Explore the passion projects and personal interests of Snehashis Gharai."
        />
        <meta name="twitter:site" content="@snehashis_ai" />
        <meta name="twitter:creator" content="@snehashis_ai" />
        <meta name="twitter:image" content="/images/og-image.jpg" />

        <link rel="canonical" href="https://snehashisgharai.me/passion" />
      </Head>

      <main>
        <VStack>
          <Container className="spacing-y text-center min-h-screen flex flex-col items-center justify-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Passion Projects
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl">
                This section is currently under development. Here you&apos;ll
                find my personal projects, creative explorations, and
                passion-driven work that goes beyond professional development.
              </p>
              <div className="text-text-secondary">
                <p>Coming Soon...</p>
              </div>
            </div>
          </Container>
        </VStack>
      </main>
    </>
  );
}
