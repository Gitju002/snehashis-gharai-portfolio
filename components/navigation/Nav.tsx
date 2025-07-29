import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "@/animations/nav-anim";
import LinkComponent from "./Link";
import Curve from "./Curve";
import Link from "next/link";

interface NavProps {
  navItems?: { href: string; label: string }[];
}

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

export default function Nav({ navItems = [] }: NavProps) {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={"menu"}
    >
      <div className={"body"}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={"nav"}
        >
          <div className={"header-text"}>
            <p>Navigation</p>
          </div>
          {navItems.map((item, index) => {
            return (
              <LinkComponent
                key={index}
                item={{ ...item, index }}
                isActive={selectedIndicator === item.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            );
          })}
        </div>
        <div className={"footer"}>
          {socialLinks.map((link) => (
            <Link key={link.id} href={link.url} target="_blank">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}


