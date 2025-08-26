import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";
import VStack from "./layout/VStack";

const ZoomParallax = () => {
  const container = useRef(null);
  const [showImageInfo, setShowImageInfo] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Listen for scroll progress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Show image info when scroll progress is close to completion (95% or more)
    setShowImageInfo(latest >= 0.95);
  });

  const scale4x = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5x = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6x = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8x = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9x = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: "/images/zoom-parallax-1.webp",
      scale: scale4x,
    },
    {
      src: "/images/zoom-parallax-2.webp",
      scale: scale5x,
    },
    {
      src: "/images/zoom-parallax-3.webp",
      scale: scale6x,
    },
    {
      src: "/images/zoom-parallax-4.webp",
      scale: scale5x,
    },
    {
      src: "/images/zoom-parallax-5.webp",
      scale: scale6x,
    },
    {
      src: "/images/zoom-parallax-6.webp",
      scale: scale8x,
    },
    {
      src: "/images/zoom-parallax-7.webp",
      scale: scale9x,
    },
  ];

  return (
    <VStack>
      <div className="zoom-parallax-section">
        <div ref={container} className={"main-container"}>
          <div className={"sticky-container"}>
            {pictures.map(({ src, scale }, index) => {
              return (
                <motion.div
                  key={index}
                  style={{ scale }}
                  className={"each-element"}
                >
                  <div className={"image-container"}>
                    <Image className="relative" src={src} fill alt="image" />
                  </div>
                </motion.div>
              );
            })}

            {/* Image Info - Outside scaled containers */}
            <AnimatePresence>
              {showImageInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-info-container"
                >
                  <div className="linear-gradient-black"></div>
                  <div className="relative z-10 space-y-3">
                    <h3>Laxmi and Narayana</h3>
                    <div className="flex items-center gap-2">
                      <svg
                        width="16"
                        height="21"
                        viewBox="0 0 16 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.5C3.6 0.5 0 4.1 0 8.5C0 13.9 7 20 7.3 20.3C7.5 20.4 7.8 20.5 8 20.5C8.2 20.5 8.5 20.4 8.7 20.3C9 20 16 13.9 16 8.5C16 4.1 12.4 0.5 8 0.5ZM8 18.2C5.9 16.2 2 11.9 2 8.5C2 5.2 4.7 2.5 8 2.5C11.3 2.5 14 5.2 14 8.5C14 11.8 10.1 16.2 8 18.2ZM8 4.5C5.8 4.5 4 6.3 4 8.5C4 10.7 5.8 12.5 8 12.5C10.2 12.5 12 10.7 12 8.5C12 6.3 10.2 4.5 8 4.5ZM8 10.5C6.9 10.5 6 9.6 6 8.5C6 7.4 6.9 6.5 8 6.5C9.1 6.5 10 7.4 10 8.5C10 9.6 9.1 10.5 8 10.5Z"
                          fill="#E8E8E8"
                        />
                      </svg>
                      <span className="text-sm">MURSHIDABAD, WEST BENGAL</span>
                    </div>
                    <p className="italic">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&apos;s standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </VStack>
  );
};

export default ZoomParallax;
