import React from "react";
import Image from "next/image";
import Separator from "../ui/Separator";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  techStack: string[];
}

interface ProjectCardDetails {
  src: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  projectDetails: ProjectCardDetails;
  index: number;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  projectDetails,
  link = "#", // Default to "#" if no link is provided
}) => {
  const { id, name, techStack } = project;
  const { src, color } = projectDetails;

  return (
    <div className="project-card">
      {/* Project Link */}
      <Link href={link} className="ext-link-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 3h6v6" />
          <path d="M10 14 21 3" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      </Link>

      {/* Project Image */}
      <div className="project-card-image" style={{ backgroundColor: color }}>
        <Image
          src={`/images/${src}`}
          width={600}
          height={350}
          alt={`${name} project screenshot`}
          className="size-full object-cover object-center rounded-lg"
        />
      </div>

      {/* Project Details */}
      <div className="project-card-content">
        <div className="flex items-start gap-x-2 mb-4">
          <h6>{id}</h6>
          <h3>{name}</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, techIndex) => (
            <React.Fragment key={tech}>
              <span className="project-tech-tag">{tech}</span>
              {techIndex < techStack.length - 1 && (
                <span className="text-text-secondary">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <Separator width="100%" />
      </div>
    </div>
  );
};

export default ProjectCard;


