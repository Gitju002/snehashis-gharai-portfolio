import React from "react";
import VStack from "@/components/layout/VStack";
import Container from "@/components/layout/Container";
import Separator from "./ui/Separator";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experienceDetails = [
  {
    id: "01",
    companyName: "RUNTIME SOLUTIONS PVT. LTD.",
    role: "JR. WEB DEVELOPER",
    duration: "DECEMBER 2024 - PRESENT",
  },
  {
    id: "02",
    companyName: "VOYAGER",
    role: "IT TRAINEE",
    duration: "JULY 2024 - SEPTEMBER 2024",
  },
  {
    id: "03",
    companyName: "INCEPTIAL TECH PVT. LTD.",
    role: "DIGITAL MARKETING INTERN",
    duration: "MARCH 2022 - JUNE 2022",
  },
];
const Experience = () => {
  gsap.registerPlugin(ScrollTrigger);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const experienceRef = React.useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Add a delay to ensure all components are mounted and positioned
    const initAnimations = () => {
      // Kill any existing ScrollTriggers for this component
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === titleRef.current ||
          experienceRef.current.includes(st.trigger as HTMLDivElement | null)
        ) {
          st.kill();
        }
      });

      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      // Title animation
      if (titleRef.current) {
        gsap.set(titleRef.current, { x: -100, opacity: 0 });
        gsap.to(titleRef.current, {
          duration: 0.8,
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            id: "experience-title",
          },
        });
      }

      // Experience items animation
      experienceRef.current.forEach((experience, index) => {
        if (experience) {
          gsap.set(experience, { opacity: 0, y: 50 });
          gsap.to(experience, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: experience,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
              id: `experience-item-${index}`,
            },
          });
        }
      });
    };

    // Use setTimeout to ensure DOM is fully ready
    const timer = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timer);
      // Clean up ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.id?.includes("experience")) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section id="experience">
      <VStack>
        <Container className="spacing-y">
          <h2 ref={titleRef}>My Experience</h2>
          {experienceDetails.map((experience, index) => (
            <div
              key={experience.id}
              ref={(el) => {
                experienceRef.current[index] = el;
              }}
              className="space-y-2"
            >
              <li>{experience.companyName}</li>
              <h3 className="hover-text-effect">{experience.role}</h3>
              <h6>{experience.duration}</h6>
              <Separator width="100%" />
            </div>
          ))}
        </Container>
      </VStack>
    </section>
  );
};

export default Experience;


