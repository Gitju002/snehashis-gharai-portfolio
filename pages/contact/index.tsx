import React from "react";
import Head from "next/head";
import VStack from "@/components/layout/VStack";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/grid/Grid";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

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

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Snehashis Gharai | Frontend Developer & Designer</title>
        <meta
          name="description"
          content="Get in touch with Snehashis Gharai for frontend development and design projects. Email: connectsnehashis22@gmail.com | Phone: +91 8420250470"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Contact Snehashis Gharai | Frontend Developer & Designer"
        />
        <meta
          property="og:description"
          content="Get in touch with Snehashis Gharai for frontend development and design projects. Available for freelance work and full-time opportunities."
        />
        <meta property="og:url" content="https://snehashisgharai.me/contact" />
        <meta property="og:type" content="website" />

        <link rel="canonical" href="https://snehashisgharai.me/contact" />
      </Head>

      <main>
        <section id="contact" aria-labelledby="contact-heading">
          <VStack>
            <Container className="spacing-y text-center">
              <div className="contact-heading-wrapper">
                <div className="contact-heading">
                  <h1 className="heading-text">
                    LET<span className="amp-text">&apos;</span>S
                  </h1>
                  <Image
                    height={480}
                    width={480}
                    src={"/images/contact-header-image.png"}
                    alt="Contact Image"
                    className="size-9 md:size-14 lg:size-24 xl:size-32"
                  />
                  <h1 className="heading-text">WORK</h1>
                </div>
                <Image
                  height={274}
                  width={740}
                  src={"/images/contact-header-text-together.png"}
                  alt="Contact Image"
                  className="w-44 md:w-72 lg:w-[450px] xl:w-[650px] 2xl:w-[740px]"
                />
              </div>

              <Grid className="text-start gap-8" cols="cols-6">
                <div className="col-span-4">
                  <ContactForm />
                </div>
                <div className="col-span-2 space-y-8">
                  <div className="mt-2 space-y-3">
                    <h6 className="text-text-secondary">CONTACT DETAILS</h6>
                    <div className="space-y-2">
                      <p>
                        <a href="mailto:connectsnehashis22@gmail.com">
                          connectsnehashis22@gmail.com
                        </a>
                      </p>
                      <p>
                        <a href="tel:+918420250470">+91 8420250470</a>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h6 className="text-text-secondary">SOCIALS</h6>
                    <div className="space-y-2">
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
              </Grid>

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
      </main>
    </>
  );
}
