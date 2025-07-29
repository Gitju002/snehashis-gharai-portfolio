import React from "react";
import VStack from "@/components/layout/VStack";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/grid/Grid";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skillsData = {
  FRONTEND: [
    { name: "JavaScript", icon: "/svgs/skills/javascript.svg" },
    { name: "TypeScript", icon: "/svgs/skills/typescript.svg" },
    { name: "React.js", icon: "/svgs/skills/reactjs.svg" },
    { name: "Next.js", icon: "/svgs/skills/nextjs.svg" },
    { name: "Redux", icon: "/svgs/skills/redux.svg" },
    { name: "Zustand", icon: "/svgs/skills/zustand.svg" },
    { name: "Tailwind CSS", icon: "/svgs/skills/tailwind.svg" },
    { name: "Framer Motion", icon: "/svgs/skills/framer-motion.svg" },
    { name: "GSAP", icon: "/svgs/skills/gsap.svg" },
    { name: "ShadCN", icon: "/svgs/skills/shadcn.svg" },
  ],
  DESIGN: [
    { name: "Figma", icon: "/svgs/skills/figma.svg" },
    { name: "Photoshop", icon: "/svgs/skills/photoshop.svg" },
    { name: "Illustrator", icon: "/svgs/skills/illustrator.svg" },
    { name: "Adobe XD", icon: "/svgs/skills/adobe.svg" },
  ],
  DATABASE: [
    { name: "MongoDB", icon: "/svgs/skills/mongodb.svg" },
    { name: "MySQL", icon: "/svgs/skills/mysql.svg" },
    { name: "Drizzle", icon: "/svgs/skills/drizzle.svg" },
  ],
  TOOLS: [
    { name: "Git", icon: "/svgs/skills/git.svg" },
    { name: "GitHub", icon: "/svgs/skills/github.svg" },
    { name: "Docker", icon: "/svgs/skills/docker.svg" },
    { name: "AWS", icon: "/svgs/skills/aws.svg" },
  ],
};

const Skills = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title first
    gsap.from(".skills-title", {
      duration: 0.8,
      x: -100,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-title",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate each skill category individually on scroll
    gsap.utils.toArray(".skills").forEach((skill) => {
      gsap.from(skill as gsap.TweenTarget, {
        duration: 0.8,
        y: 60,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skill as Element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.utils.toArray(".skill-items").forEach((skill) => {
      gsap.from(skill as gsap.TweenTarget, {
        duration: 0.8,
        y: 60,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skill as Element,
          start: "top 85%",
          end: "top 20%",
          scrub: 1, // Links animation progress to scroll position
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);
  return (
    <section id="skills" className="skills-section">
      <VStack>
        <Container className="spacing-y">
          <h2 className="skills-title">My Stack</h2>
          <div className="spacing-y">
            {Object.entries(skillsData).map(([category, skills]) => (
              <Grid className="skills" key={category} cols="cols-6">
                <h3 className="col-span-2">{category}</h3>
                <div className="col-span-4 flex flex-wrap gap-x-14 gap-y-8">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex-center gap-2 md:gap-4 skill-items"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        height={40}
                        width={40}
                        className="icon-size"
                      />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </Grid>
            ))}
          </div>
        </Container>
      </VStack>
    </section>
  );
};

export default Skills;
