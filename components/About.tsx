import React, { useRef } from "react";
import VStack from "@/components/layout/VStack";
import Container from "@/components/layout/Container";
import Grid from "./layout/grid/Grid";
import Separator from "./ui/Separator";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTextReveal } from "./ui/TextReveal";

type AboutProps = {
  // Text content props
  mainText: string;
  uniquePerspectiveText?: string;
  professionalGrowthText?: string;
  servicesHeading?: string;

  // Visibility props
  showImage?: boolean;
  showServices?: boolean;

  // Services data
  services?: { key: string; title: string; description: string }[];
};

const defaultServices = [
  {
    key: "01",
    title: "DESIGN",
    description:
      "With a solid track record in designing websites, I deliver strong user-friendly digital designs. (Since 2024 only in combination with development)",
  },
  {
    key: "02",
    title: "DEVELOPMENT",
    description:
      "I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction. Building with modern technologies.",
  },
  {
    key: "03",
    title: "FULL PACKAGE",
    description:
      "A complete website from concept to implementation, that's what makes me stand out. My great sense for design and my development skills enable me to create kick-ass projects",
  },
];

const About = ({
  mainText,
  uniquePerspectiveText,
  professionalGrowthText,
  servicesHeading,
  showImage = true,
  showServices = true,
  services = defaultServices,
}: AboutProps) => {
  const {
    elements: textElements,
    refs,
    createAnimation: createTextAnimation,
  } = useTextReveal(mainText);
  const povText = useRef<HTMLParagraphElement | null>(null);
  const growthText = useRef<HTMLParagraphElement | null>(null);
  const servicesHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const servicesGridRef = useRef<HTMLDivElement | null>(null);
  const textContainer = useRef(null);
  const arrowRef = useRef(null);
  const body = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    createTextAnimation(textContainer.current);

    gsap.set(povText.current, { x: 30, opacity: 0.1 });
    gsap.set(growthText.current, { x: -30, opacity: 0.1 });
    gsap.set(servicesHeadingRef.current, { y: 30, opacity: 0.1 });
    gsap.set(".service-item", { y: 200, opacity: 0 });
    gsap.set(arrowRef.current, { x: 0, opacity: 1, rotate: 0 });

    gsap.to(povText.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: povText.current,
        scrub: true,
        start: "top 60%",
        end: "bottom 40%",
      },
      ease: "none",
    });

    gsap.to(growthText.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: growthText.current,
        scrub: true,
        start: "top 70%",
        end: "bottom 60%",
      },
      ease: "none",
    });

    gsap.from(".image-content", {
      duration: 1,
      y: 200,
      opacity: 0,
      ease: "power2.out",
      delay: "0.5",
      scrollTrigger: {
        trigger: ".image-content",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(servicesHeadingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: servicesHeadingRef.current,
        scrub: true,
        start: "top 70%",
        end: "bottom 30%",
      },
      ease: "none",
    });

    gsap.to(".service-item", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: servicesGridRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    gsap.set(arrowRef.current, { rotate: 0 });

    gsap.from(arrowRef.current, {
      x: -30,
      rotate: -45,
      opacity: 0.1,
      duration: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: arrowRef.current,
        scrub: true,
        start: "top 60%",
        end: "bottom 40%",
        toggleActions: "play none none reverse",
      },
    });
  }, [
    textContainer,
    refs,
    body,
    povText,
    growthText,
    arrowRef,
    servicesHeadingRef,
    servicesGridRef,
  ]);

  return (
    <section id="about" aria-labelledby="about-heading">
      {/* Hidden SEO heading */}
      <h2 id="about-heading" className="sr-only">
        About Snehashis Gharai - Frontend Developer and Designer
      </h2>

      {/* Text Content */}
      <VStack>
        <Container className="flex-col flex-center gap-16">
          <Grid gap={8} cols="cols-6">
            <div ref={textContainer} className="col-span-4">
              {/* Text for SEO only */}
              <h3 className="sr-only">
                Snehashis Gharai&apos;s Professional Mission
              </h3>

              {/* Motive of About Section */}
              <div ref={body}>{textElements}</div>
            </div>
            <div className="col-span-2">
              {/* Text for SEO only */}
              <h3 className="sr-only">
                Snehashis Gharai&apos;s Unique Perspective
              </h3>

              {/* Unique Perspective Paragraph */}
              <p ref={povText}>{uniquePerspectiveText}</p>
            </div>
          </Grid>
          <Separator width="75%" />
        </Container>
      </VStack>

      {/* Image Content */}
      {showImage && (
        <VStack className="image-content" padding="none">
          <Container className="flex-col flex-center gap-16">
            <Grid cols="cols-6" className="gap-8">
              <div className="col-span-2 w-[75%]">
                <h3 className="sr-only">
                  Snehashis Gharai&apos;s Professional Growth
                </h3>

                {/* Arrow SVG */}
                <Image
                  ref={arrowRef}
                  src={"/svgs/arrow.svg"}
                  height={80}
                  width={80}
                  alt="Decorative arrow pointing to Snehashis Gharai"
                  className="arrow-size"
                />

                {/* Professional Growth Paragraph */}
                <p ref={growthText}>{professionalGrowthText}</p>
              </div>

              {/* About Image */}
              <div className="col-span-4">
                <Image
                  src={"/images/about-image.jpg"}
                  alt="Snehashis Gharai - Frontend Developer and Designer working on projects"
                  height={1266}
                  width={1013}
                  priority
                  data-scroll
                  data-scroll-speed="0.2"
                />
              </div>
            </Grid>
          </Container>
        </VStack>
      )}

      {/* Services */}
      {showServices && (
        <VStack>
          <Container>
            <h2 ref={servicesHeadingRef}>{servicesHeading}</h2>
            <div ref={servicesGridRef}>
              <Grid
                cols="cols-6"
                className="gap-8 mt-4 md:mt-6 lg:mt-8 2xl:mt-16"
              >
                {services.map((service) => (
                  <article
                    key={service.key}
                    className="service-item col-span-2 "
                  >
                    <h6>{service.key}</h6>
                    <Separator width="100%" />
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </article>
                ))}
              </Grid>
            </div>
          </Container>
        </VStack>
      )}
    </section>
  );
};

export default About;
