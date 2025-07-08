import React from "react";
import VStack from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Separator from "./ui/Separator";

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
  return (
    <section id="experience">
      <VStack>
        <Container padding="none" className="space-y-16">
          <h2>My Experience</h2>
          {experienceDetails.map((experience) => (
            <div key={experience.id} className="space-y-2">
              <li>{experience.companyName}</li>
              <h3>{experience.role}</h3>
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
