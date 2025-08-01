import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigationContext } from "@/contexts/NavigationContext";

type ScrollToTopProps = {
  showAfter?: number; // Scroll distance in pixels after which button appears
  className?: string;
};

const ScrollToTop = ({ showAfter = 300, className = "" }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isNavOpen } = useNavigationContext();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(currentScrollY > showAfter);
    };

    // Add scroll listener to window
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also listen for custom scroll events that might be dispatched by Locomotive Scroll
    const handleCustomScroll = (event: CustomEvent<{ scroll: number }>) => {
      if (event.detail && typeof event.detail.scroll === "number") {
        setIsVisible(event.detail.scroll > showAfter);
      }
    };

    window.addEventListener(
      "locomotive-scroll",
      handleCustomScroll as EventListener
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(
        "locomotive-scroll",
        handleCustomScroll as EventListener
      );
    };
  }, [showAfter]);

  const scrollToTop = () => {
    // Clear URL hash (remove /#section-id)
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    // Try Locomotive Scroll first
    if (
      window.locomotiveScroll &&
      typeof window.locomotiveScroll.scrollTo === "function"
    ) {
      try {
        window.locomotiveScroll.scrollTo(0, {
          duration: 1.2,
        });
      } catch {
        // Fallback to regular scroll if Locomotive Scroll fails
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else {
      // Fallback to regular smooth scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && !isNavOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          onClick={scrollToTop}
          className={`
            fixed bottom-6 right-6 z-50
            w-12 h-12 md:w-14 md:h-14
            rounded-full
            bg-foreground text-background
            hover:bg-accent hover:text-foreground
            border border-foreground/20
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/50
            ${className}
          `}
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
