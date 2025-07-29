"use client";
import React, { useRef } from "react";
import VStack from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Image from "next/image";
import SwitchButton from "./ui/SwitchButton";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/app/hooks/media-query";
import Magnetic from "./ui/Magnetic";

export default function Hero() {
  const { isDesktop } = useMediaQuery();

  gsap.registerPlugin(ScrollTrigger);

  // useEffect(() => {
  //   (async () => {
  //     // Only create Lenis instance if it doesn't exist
  //     if (typeof window !== "undefined" && !(window as any).lenis) {
  //       const LocomotiveScroll = (await import("locomotive-scroll")).default;

  //       const locomotiveScroll = new LocomotiveScroll();

  //       // Make Lenis instance available globally for navigation control
  //       (window as any).lenis = locomotiveScroll;
  //     }
  //   })();
  // }, []);

  const snehashisDesktopRef = useRef<HTMLHeadingElement>(null);
  const gharaiDesktopRef = useRef<HTMLHeadingElement>(null);
  const snehashisMobileRef = useRef<HTMLHeadingElement>(null);
  const gharaiMobileRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Desktop animations
    if (isDesktop) {
      gsap.from(snehashisDesktopRef.current, {
        duration: 0.5,
        y: "10%",
        opacity: 0,
        ease: "sine",
        delay: 0.3,
        scrollTrigger: {
          trigger: snehashisDesktopRef.current,
        },
      });

      gsap.from(gharaiDesktopRef.current, {
        duration: 1,
        y: "15%",
        opacity: 0,
        ease: "sine",
        delay: 0.6,
        scrollTrigger: {
          trigger: gharaiDesktopRef.current,
        },
      });
    } else {
      // Mobile animations
      gsap.from(snehashisMobileRef.current, {
        duration: 0.5,
        y: "10%",
        opacity: 0,
        ease: "sine",
        delay: 0.3,
        scrollTrigger: {
          trigger: snehashisMobileRef.current,
        },
      });

      gsap.from(gharaiMobileRef.current, {
        duration: 1,
        y: "15%",
        opacity: 0,
        ease: "sine",
        delay: 0.6,
        scrollTrigger: {
          trigger: gharaiMobileRef.current,
        },
      });
    }

    gsap.set(arrowRef.current, {
      rotate: -45,
      transformOrigin: "center center",
    });

    gsap.to(arrowRef.current, {
      duration: 1,
      rotate: 0,
      ease: "sine",
    });
  }, [
    snehashisMobileRef,
    snehashisMobileRef,
    gharaiDesktopRef,
    gharaiMobileRef,
    isDesktop,
    arrowRef,
  ]);

  useGSAP(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const depth = 20;
      const moveX = (event.pageX - window.innerWidth / 2) / depth;
      const moveY = (event.pageY - window.innerHeight / 2) / depth;

      gsap.to([".text-snehashis", ".text-gharai"], {
        x: -moveX,
        y: -moveY,
        ease: "expo",
        duration: 1,
        stagger: 0.003,
        overwrite: true,
      });
    };

    setTimeout(() => {
      document.addEventListener("mousemove", handleMouseMove);
    }, 1500);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [".text-snehashis", ".text-gharai"]);

  return (
    <section id="hero" className="hero-container hero-image">
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

          {/* Hero Section Text and SVG for Desktop View (lg and above) */}
          {isDesktop && (
            <div className="text-container-desktop">
              <div data-scroll data-scroll-speed="0.1" className="text-wrapper">
                <Image
                  ref={arrowRef}
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

                <h1
                  ref={snehashisDesktopRef}
                  className="text-snehashis"
                  aria-label="Snehashis Gharai Name"
                >
                  SNEHASHIS
                </h1>
              </div>

              <h1
                ref={gharaiDesktopRef}
                className="text-gharai"
                aria-label="Snehashis Gharai Surname"
              >
                GHARAI
              </h1>
            </div>
          )}

          {/* Hero Section Text for Mobile View (below lg) */}
          {!isDesktop && (
            <div className="text-container-mobile">
              <h1
                ref={snehashisMobileRef}
                className="font-test-manuka font-bold"
              >
                SNEHASHIS
              </h1>
              <h1 ref={gharaiMobileRef} className="font-test-manuka font-bold">
                GHARAI
              </h1>
            </div>
          )}
        </Container>

        {/* Hero Section Subtitle for Mobile View (below lg) */}
        {!isDesktop && (
          <div
            data-scroll
            data-scroll-speed="0.1"
            className="text-wrapper-mobile"
          >
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
        )}

        {/* Gradient for Mobile View (below lg) */}
        {!isDesktop && <div className="gradient-mobile" />}
      </VStack>

      {/* Switch Button for Portfolio Mode */}
      <div data-scroll data-scroll-speed="0.1" className="btn-position">
        <Magnetic>
          <SwitchButton />
        </Magnetic>
      </div>
    </section>
  );
}
