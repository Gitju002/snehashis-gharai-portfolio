import React from "react";
import VStack from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Grid from "./layout/grid/Grid";
import Separator from "./ui/Separator";
import Image from "next/image";

const options = [
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

const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading">
      {/* Hidden SEO heading */}
      <h2 id="about-heading" className="sr-only">
        About Snehashis Gharai - Frontend Developer and Designer
      </h2>

      {/* Text Content */}
      <VStack>
        <Container padding="none" className="flex-col flex-center gap-16">
          <Grid gap={8} cols="cols-6">
            <div className="col-span-4">
              <h3 className="sr-only">
                Snehashis Gharai&apos;s Professional Mission
              </h3>
              <h5>
                Helping brands stand out in the digital world. I bring fresh
                ideas, a hands-on approach, and a passion for creating bold,
                meaningful work. No fluff — just real results, built together.
              </h5>
            </div>
            <div className="col-span-2">
              <h3 className="sr-only">
                Snehashis Gharai&apos;s Unique Perspective
              </h3>
              <p>
                The mix of my skills as a developer and designer — along with my
                passion for photography — gives me a unique perspective
                positions me in a unique place in the web design world.
              </p>
            </div>
          </Grid>
          <Separator width="75%" />
        </Container>
      </VStack>

      {/* Image Content */}
      <VStack padding="none">
        <Container padding="none" className="flex-col flex-center gap-16">
          <Grid cols="cols-6" className="gap-8">
            <div className="col-span-2 w-[75%] mt-24">
              <h3 className="sr-only">
                Snehashis Gharai&apos;s Professional Growth
              </h3>
              <p>
                I always try to learn and adapt new skills to cope with modern
                trends. With each project, work is pushed to new horizons,
                always prioritizing quality.
              </p>
            </div>
            <div className="col-span-4">
              <Image
                src={"/images/about-image.jpg"}
                alt="Snehashis Gharai - Frontend Developer and Designer working on projects"
                height={1266}
                width={1013}
                priority
              />
            </div>
          </Grid>
        </Container>
      </VStack>

      {/* Services */}
      <VStack>
        <Container padding="none">
          <h2>I can help you with ...</h2>
          <Grid cols="cols-6" className="gap-8 mt-16">
            {options.map((option) => (
              <article key={option.key} className="col-span-2">
                <h6>{option.key}</h6>
                <Separator width="100%" />
                <h4>{option.title}</h4>
                <p>{option.description}</p>
              </article>
            ))}
          </Grid>
        </Container>
      </VStack>
    </section>
  );
};

export default About;
