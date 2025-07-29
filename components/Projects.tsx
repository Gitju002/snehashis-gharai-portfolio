import React from "react";
import VStack from "@/components/layout/VStack";
import Container from "@/components/layout/Container";
import Modal from "./project/Modal";
import ProjectDetails from "./project/ProjectDetails";
import ProjectCard from "./project/ProjectCard";
import {
  useIsAboveBreakpoint,
  useIsBelowBreakpoint,
} from "../hooks/media-query";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const projects = [
  {
    id: "01",
    name: "British Club Kolkata",
    techStack: ["React.JS", "MongoDB", "Node.js"],
  },
  {
    id: "02",
    name: "IntervYou",
    techStack: ["Next.JS", "Firebase", "Toolkit Query"],
  },
  {
    id: "03",
    name: "GSOE Voting App",
    techStack: ["Next.JS", "PostgreSQL", "Framer Motion"],
  },
  {
    id: "04",
    name: "Gemisha Tech Fest",
    techStack: ["Next.JS", "MongoDB", "Tailwind CSS"],
  },
];

const modalDetails = [
  {
    src: "project-1.png",
    color: "#abecff",
    link: "https://britishclubkolkata.com",
  },
  {
    src: "project-2.png",
    color: "#690061",
    link: "https://intervyou-ai-platform.vercel.app",
  },
  {
    src: "project-3.png",
    color: "#a94d0d",
    link: "https://gsoeawards2024-votingapp.in/",
  },
  {
    src: "project-4.png",
    color: "#4e4eda",
    link: "https://gemisha-2k24.vercel.app/",
  },
];
const Projects = () => {
  const projectCardsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  const projectsTitleRef = React.useRef<HTMLHeadingElement>(null);

  const [modal, setModal] = React.useState({ active: false, index: 0 });

  const isAboveBreakpoint = useIsAboveBreakpoint("lg");
  const isBelowBreakpoint = useIsBelowBreakpoint("lg");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const initAnimations = () => {
      // Clean up any existing ScrollTriggers for this component
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.id?.includes("projects")) {
          st.kill();
        }
      });

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();

      // Title animation
      if (projectsTitleRef.current) {
        gsap.set(projectsTitleRef.current, {
          x: isBelowBreakpoint ? -50 : -100,
          opacity: 0,
        });
        gsap.to(projectsTitleRef.current, {
          duration: 0.8,
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsTitleRef.current,
            start: isBelowBreakpoint ? "top 85%" : "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            id: "projects-title",
          },
        });
      }

      // Project cards animation (mobile/tablet only)
      if (isBelowBreakpoint && projectCardsRef.current.length > 0) {
        projectCardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.set(card, { opacity: 0, y: 50 });
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
                id: `projects-card-${index}`,
              },
            });
          }
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initAnimations, 50);

    return () => {
      clearTimeout(timer);
      // Clean up on unmount
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.id?.includes("projects")) {
          st.kill();
        }
      });
    };
  }, [isBelowBreakpoint]);

  return (
    <section id="projects">
      <VStack>
        <Container className="spacing-y">
          <h2 ref={projectsTitleRef}>My Projects</h2>

          {/* Desktop View - Project Details with Modal */}
          {isAboveBreakpoint && (
            <Link href={modalDetails[modal.index].link} target="_blank">
              {projects.map((project, index) => (
                <ProjectDetails
                  key={project.id}
                  id={project.id}
                  index={index}
                  name={project.name}
                  techStack={project.techStack}
                  setModal={setModal}
                />
              ))}
              <Modal modal={modal} projects={modalDetails} />
            </Link>
          )}

          {/* Mobile/Tablet View - Project Cards */}
          {isBelowBreakpoint && (
            <div className="flex flex-col space-y-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectCardsRef.current[index] = el;
                  }}
                >
                  <ProjectCard
                    link={modalDetails[index].link}
                    project={project}
                    projectDetails={modalDetails[index]}
                    index={index}
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </VStack>
    </section>
  );
};

export default Projects;
