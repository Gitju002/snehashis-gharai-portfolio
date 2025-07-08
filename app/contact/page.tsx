import React from "react";
import { Metadata } from "next";
import VStack from "@/app/components/layout/VStack";
import Container from "@/app/components/layout/Container";
import Grid from "@/app/components/layout/grid/Grid";

export const metadata: Metadata = {
  title: "Contact Snehashis Gharai | Frontend Developer & Designer",
  description:
    "Get in touch with Snehashis Gharai for frontend development and design projects. Email: connectsnehashis22@gmail.com | Phone: +91 8420250470",
  openGraph: {
    title: "Contact Snehashis Gharai | Frontend Developer & Designer",
    description:
      "Get in touch with Snehashis Gharai for frontend development and design projects. Available for freelance work and full-time opportunities.",
    url: "https://snehashisgharai.me/contact",
  },
};

export default function Contact() {
  return (
    <main>
      <section id="contact" aria-labelledby="contact-heading">
        <VStack>
          <Container padding="none" className="space-y-16">
            <div className="text-center">
              <h1 id="contact-heading">Contact Snehashis Gharai</h1>
              <p className="text-xl mt-6">
                Ready to work together? Let&apos;s create something amazing!
              </p>
            </div>

            <Grid cols="cols-2" className="gap-16">
              <div className="space-y-8">
                <h2>Get in Touch</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:connectsnehashis22@gmail.com"
                      className="text-accent hover:underline"
                    >
                      connectsnehashis22@gmail.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Phone</h3>
                    <a
                      href="tel:+91 8420250470"
                      className="text-accent hover:underline"
                    >
                      +91 8420250470
                    </a>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <p>India</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h2>Social Media</h2>
                <div className="space-y-4">
                  <a
                    href="https://github.com/gitju002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-accent hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/snehashis-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-accent hover:underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/snehashis_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-accent hover:underline"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://x.com/snehashis_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-accent hover:underline"
                  >
                    X (Twitter)
                  </a>
                </div>
              </div>
            </Grid>
          </Container>
        </VStack>
      </section>
    </main>
  );
}
