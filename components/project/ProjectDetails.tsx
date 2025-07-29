import React from "react";
import Separator from "../ui/Separator";

interface ProjectDetailsProps {
  id: string;
  index: number;
  name: string;
  techStack: string[];
  setModal: (modal: { active: boolean; index: number }) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  id,
  index,
  name,
  techStack,
  setModal,
}) => {
  return (
    <div
      key={id}
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="project"
    >
      <div className="flex items-start gap-x-2">
        <h6>{id}</h6>
        <h3>{name}</h3>
      </div>
      <div className="flex gap-4">
        {techStack.map((tech, index) => (
          <React.Fragment key={tech}>
            <h6>{tech}</h6>
            {index < techStack.length - 1 && (
              <h6 className="text-sm lg:text-xl">•</h6>
            )}
          </React.Fragment>
        ))}
      </div>
      <Separator width="100%" />
    </div>
  );
};

export default ProjectDetails;


