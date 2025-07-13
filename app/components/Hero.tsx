import React from "react";
import VStack from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Image from "next/image";
import SwitchButton from "./ui/SwitchButton";

export default function Hero() {
  return (
    <section className="hero-container hero-image">
      <VStack>
        <Container className="hero-container-wrapper">
          {/* SEO optimized content */}
          <div className="sr-only">
            <h1>Snehashis Gharai - Frontend Developer and Designer</h1>
            <p>
              Professional Frontend Developer and Designer from India,
              specializing in React.js, Next.js, TypeScript, and modern web
              development technologies.
            </p>
          </div>
          {/* Gradient for smooth transition of Hero Image */}
          <div className="gradient" />

          {/* Hero Section Text and SVG for Desktop View */}
          <div className="text-container-desktop">
            <div className="text-wrapper">
              <Image
                src={"/svgs/arrow.svg"}
                height={80}
                width={80}
                alt="Decorative arrow pointing to Snehashis Gharai"
                className="arrow-size"
              />
              <h2 className="text-subtitle" role="banner">
                FRONTEND DEVELOPER <span className="ampersand">&amp;</span>{" "}
                <br />
                DESIGNER FROM INDIA
              </h2>

              <h1 aria-label="Snehashis Gharai Name">SNEHASHIS</h1>
            </div>

            <h1 className="text-gharai" aria-label="Snehashis Gharai Surname">
              GHARAI
            </h1>
          </div>

          {/* Hero Section Text for Mobile View */}
          <div className="text-container-mobile">
            <h1 className="font-test-manuka font-bold">SNEHASHIS</h1>
            <h1 className="font-test-manuka font-bold">GHARAI</h1>
          </div>
        </Container>
        {/* Hero Section Subtitle for Mobile View */}
        <div className="text-wrapper-mobile">
          <Image
            src={"/svgs/arrow.svg"}
            height={80}
            width={80}
            alt="Decorative arrow pointing to Snehashis Gharai"
            className="arrow-size"
          />
          <h2 className="text-2xl font-test-manuka font-bold tracking-normal ">
            FRONTEND DEVELOPER{" "}
            <span className="font-dm-sans font-bold text-2xl"> &amp; </span>{" "}
            DESIGNER FROM INDIA
          </h2>
        </div>
        {/* Gradient for Mobile View */}
        <div className="gradient-mobile" />
      </VStack>

      {/* Switch Button for Portfolio Mode */}
      <div className="btn-position">
        <SwitchButton />
      </div>
    </section>
  );
}
