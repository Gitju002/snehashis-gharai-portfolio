import React from "react";
import VStack from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Separator from "@/app/components/ui/Separator";
import CircleButton from "./ui/CircleButton";
import Image from "next/image";

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
  return (
    <section id="footer">
      <VStack>
        <Container padding="none">
          {/* Footer Start */}
          <Container className="relative px-64">
            <h1 className="footer-heading-text">
              Let<span className="footer-amp-text">&apos;</span>s Work
              <br />
              together
            </h1>
            <Separator className="mt-10" />

            <Image
              src={"/svgs/arrow.svg"}
              height={80}
              width={80}
              alt="arrow"
              className="absolute rotate-90 top-40 right-72"
            />

            <CircleButton size="2xl" className="circle-btn-position" />

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
            <div className="space-y-6">
              <p>VERSION</p>
              <h6>2025 © Snehashis Gharai. All Rights Reserved</h6>
            </div>
            <div className="space-y-6">
              <p>SOCIALS</p>
              <div className="flex-center gap-x-4">
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
