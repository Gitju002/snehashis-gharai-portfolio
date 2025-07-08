import React from "react";
import VStack from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Separator from "./ui/Separator";

const projects = [
  {
    id: "01",
    name: "Project Name 1",
    techStack: ["techstack_1", "techstack_2", "techstack_3"],
  },
  {
    id: "02",
    name: "Project Name 2",
    techStack: ["techstack_1", "techstack_2", "techstack_3"],
  },
  {
    id: "03",
    name: "Project Name 3",
    techStack: ["techstack_1", "techstack_2", "techstack_3"],
  },
  {
    id: "04",
    name: "Project Name 4",
    techStack: ["techstack_1", "techstack_2", "techstack_3"],
  },
];
const Projects = () => {
  return (
    <section id="projects">
      <VStack>
        <Container padding="none" className="space-y-16">
          <h2>My Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="space-y-6">
              <div className="flex items-start gap-x-2">
                <h6>{project.id}</h6>
                <h3>{project.name}</h3>
              </div>
              <div className="flex gap-4">
                {project.techStack.map((tech, index) => (
                  <React.Fragment key={tech}>
                    <h6>{tech}</h6>
                    {index < project.techStack.length - 1 && (
                      <h6 className="text-xl">•</h6>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <Separator width="100%" />
            </div>
          ))}
        </Container>
      </VStack>
    </section>
  );
};

export default Projects;
