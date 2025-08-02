import React, { useRef } from "react";
import VStack from "@/components/layout/VStack";
import Container from "@/components/layout/Container";
import Separator from "@/components/ui/Separator";
import CircleButton from "./ui/CircleButton";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsAboveBreakpoint } from "@/hooks/media-query";

const socialLinks = [
  { id: 1, name: "Github", url: "https://github.com/gitju002" },
  { id: 2, name: "LinkedIn", url: "https://www.linkedin.com/in/snehashis-ai" },
  {
    id: 3,
    name: "Instagram",
    url: "https://www.instagram.com/snehashis_ai",
  },
  { id: 4, name: "X", url: "https://x.com/snehashis_ai" },
];

const Footer = () => {
  const circleBtn = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLImageElement>(null);
  const isAboveLg = useIsAboveBreakpoint("lg");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (circleBtn.current) {
      if (isAboveLg) {
        gsap.set(circleBtn.current, { x: 100 });
      } else {
        gsap.set(circleBtn.current, { x: 30 });
      }

      gsap.to(circleBtn.current, {
        duration: 1,
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: circleBtn.current,
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });
    }
    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        {
          rotate: "120deg",
          ease: "none",
        },
        {
          rotate: "90deg",
          ease: "none",
          scrollTrigger: {
            trigger: arrowRef.current,
            scrub: true,
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [circleBtn, arrowRef]);

  return (
    <section id="footer">
      <VStack>
        <Container>
          {/* Footer Start */}
          <Container className="relative px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 3xl:!px-40 4xl:!px-52">
            <h1 className="footer-heading-text">
              Let<span className="footer-amp-text">&apos;</span>s Work
              <br />
              together
            </h1>
            <Separator className="mt-10" />

            <Image
              ref={arrowRef}
              src={"/svgs/arrow.svg"}
              height={80}
              width={80}
              alt="arrow"
              className="footer-arrow-position arrow-size"
            />

            <Link href="/contact">
              <CircleButton
                type="button"
                size="2xl"
                className="circle-btn-position"
                ref={circleBtn}
              >
                Get in touch
              </CircleButton>
            </Link>

            <div className="contact-details">
              <p className="detail-text">
                <a href="mailto:connectsnehashis22@gmail.com">
                  connectsnehashis22@gmail.com
                </a>
              </p>
              <p className="detail-text">
                <a href="tel:+91 8420250470">+91 8420250470</a>
              </p>
            </div>
          </Container>

          {/* Footer End */}
          <div className="footer-end-section">
            <div className="version-text spacing">
              <p>VERSION</p>
              <h6>2025 © Snehashis Gharai. All Rights Reserved</h6>
            </div>
            <div className="socials-text spacing">
              <p>SOCIALS</p>
              <div className="flex lg:flex-center gap-x-4">
                {socialLinks.map((link) => (
                  <h6 key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      {link.name}
                    </a>
                  </h6>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </VStack>
    </section>
  );
};

export default Footer;
