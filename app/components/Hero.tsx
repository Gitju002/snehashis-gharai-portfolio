import React from "react";
import Section from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Image from "next/image";
import SwitchButton from "./ui/SwitchButton";

export default function Hero() {
  return (
    <Section padding="none">
      <Container padding="none" className="relative flex-center">
        {/* SEO optimized content */}
        <div className="sr-only">
          <h1>Snehashis Gharai - Frontend Developer and Designer</h1>
          <p>
            Professional Frontend Developer and Designer from India,
            specializing in React.js, Next.js, TypeScript, and modern web
            development technologies.
          </p>
        </div>

        {/* Arrow SVG */}
        <Image
          src={"/svgs/arrow.svg"}
          height={80}
          width={80}
          alt="Decorative arrow pointing to Snehashis Gharai"
          className="absolute top-[15%] left-[8%] z-10"
        />

        {/* Hero Section Animated Text */}
        <div className="hero-animated-text">
          <h1 className="text-snehashis" aria-label="Snehashis Gharai Name">
            SNEHASHIS
          </h1>
          <h1 className="text-gharai" aria-label="Snehashis Gharai Surname">
            GHARAI
          </h1>
          <h2 className="text-subtitle" role="banner">
            FRONTEND DEVELOPER <span className="ampersand">&amp;</span> <br />
            DESIGNER FROM INDIA
          </h2>
        </div>

        {/* Hero Section Image */}
        <div className="hero-container">
          <figure
            about="Snehashis Gharai Professional Image"
            className="hero-image"
            role="img"
            aria-label="Snehashis Gharai - Frontend Developer and Designer"
          ></figure>
          <div className="gradient" />

          {/* Content Switch Button */}
          <div className="absolute bottom-20 right-56 z-20">
            <SwitchButton />
          </div>
        </div>
      </Container>
    </Section>
  );
}
