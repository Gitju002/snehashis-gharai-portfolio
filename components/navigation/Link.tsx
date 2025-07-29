import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "@/animations/nav-anim";

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
      <Link href={href}>{label}</Link>
    </motion.div>
  );
}


