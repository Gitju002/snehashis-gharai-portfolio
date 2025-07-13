import React from "react";
import VStack from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Grid from "@/app/components/layout/grid/Grid";
import Image from "next/image";

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
  return (
    <section id="skills">
      <VStack>
        <Container className="spacing-y">
          <h2>My Stack</h2>
          <div className="spacing-y">
            {Object.entries(skillsData).map(([category, skills]) => (
              <Grid key={category} cols="cols-6">
                <h3 className="col-span-2">{category}</h3>
                <div className="col-span-4 flex flex-wrap gap-x-14 gap-y-8">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex-center gap-2 md:gap-4"
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
