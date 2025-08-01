import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "@/animations/nav-anim";
import { usePathname } from "next/navigation";
import { scrollToSection, getSectionId } from "@/lib/utils";

interface LinkComponentsProps {
  item: {
    label: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}

export default function LinkComponent({
  item,
  isActive,
  setSelectedIndicator,
}: LinkComponentsProps) {
  const { label, href, index } = item;
  const pathname = usePathname();

  // Handle navigation click with smooth scrolling
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const sectionId = getSectionId(href);

    // If it's a section link and we're on the homepage, prevent default and scroll
    if (sectionId && pathname === "/") {
      e.preventDefault();

      // Add small delay for mobile nav to close
      setTimeout(() => {
        scrollToSection(sectionId, 100);
      }, 300);
    }
    // For section links from other pages (like /contact), allow normal navigation to homepage
    // For other links, let the default behavior handle it
  };

  return (
    <motion.div
      className={"link"}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={"indicator"}
      ></motion.div>
      <Link href={href} onClick={(e) => handleNavClick(e, href)}>
        {label}
      </Link>
    </motion.div>
  );
}
