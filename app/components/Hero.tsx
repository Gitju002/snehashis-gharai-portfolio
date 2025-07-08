import React from "react";
import Section from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Image from "next/image";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <Section padding="none">
      <Container padding="none" className="relative flex-center">
        {/* Arrow SVG */}
        <Image
          src={"/svgs/arrow.svg"}
          height={80}
          width={80}
          alt="arrow"
          className="absolute top-[15%] left-[8%] z-10"
        />

        {/* Hero Section Animated Text */}
        <div className="hero-animated-text">
          <h1 className="text-snehashis">SNEHASHIS</h1>
          <h1 className="text-gharai">GHARAI</h1>
          <h2 className="text-subtitle">
            FRONTEND DEVELOPER <span className="ampersand">&amp;</span> <br />
            DESIGNER FROM INDIA
          </h2>
        </div>

        {/* Hero Section Image */}
        <div className="hero-container">
          <figure
            about="Snehashis Gharai Image"
            className="hero-image"
          ></figure>
          <div className="gradient" />

          {/* Content Switch Button */}
          <div className="absolute bottom-20 right-56 z-20">
            <Button />
          </div>
        </div>
      </Container>
    </Section>
  );
}
