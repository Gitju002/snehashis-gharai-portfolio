import React from "react";
import ZoomParallax from "@/components/ZoomParallax";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExploreCardSection from "@/components/ExploreCardSection";
import Footer from "@/components/Footer";
export default function Passion() {
  return (
    <main>
      <Hero
        heroImage="hero-about-image"
        title="SNEHASHIS GHARAI"
        subtitle="PHOTOGRAPHER & CINEMATOGRAPHER"
      />
      <About
        mainText="Photography is like third eye for me, When I hold a camera in my hand, I certainly feel like I am getting another POV... it is my sole passion which helps me to build a bridge bewteen my profession and passion."
        uniquePerspectiveText="I started photography when I was a kid, I used to click pictures with a keypad phone’s 2mp Camera, from there and buying my own DSLR it has been a long journey... "
        showImage={false}
        showServices={false}
      />
      <ZoomParallax />
      <ExploreCardSection />
      <Footer />
    </main>
  );
}
