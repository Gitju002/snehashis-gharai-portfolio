import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import {
  useIsAboveBreakpoint,
  useIsBelowBreakpoint,
} from "@/hooks/media-query";
import Magnetic from "../ui/Magnetic";
import { scrollToSection, getSectionId } from "@/lib/utils";
import { useLoadingContext } from "@/contexts/LoadingContext";
import { useNavigationContext } from "@/contexts/NavigationContext";

type NavItem = {
  href: string;
  label: string;
};

const navigationItems: NavItem[] = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

declare global {
  interface Window {
    scrollPreventCleanup?: () => void;
  }
}

export default function Header() {
  const header = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const { setIsNavOpen } = useNavigationContext();
  const pathname = usePathname();
  const isAboveBreakpoint = useIsAboveBreakpoint("lg");
  const isBelowBreakpoint = useIsBelowBreakpoint("lg");
  const prevPathname = useRef(pathname);
  const { hasLoadingCompleted } = useLoadingContext();

  // Sync local state with context
  useEffect(() => {
    setIsNavOpen(isActive);
  }, [isActive, setIsNavOpen]);

  // Handle navigation click with smooth scrolling
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const sectionId = getSectionId(href);

    // If it's a section link and we're on the homepage, prevent default and scroll
    if (sectionId && pathname === "/") {
      e.preventDefault();
      scrollToSection(sectionId, 100);
    }
    // For section links from other pages (like /contact), allow normal navigation to homepage
    // For other links, let the default behavior handle it
  };

  useEffect(() => {
    // Close navigation when pathname changes
    if (prevPathname.current !== pathname) {
      setIsActive(false);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  // Handle hash-based scrolling when page loads with a hash
  useEffect(() => {
    const handleHashScrolling = () => {
      // Check if there's a hash in the URL and we're on the homepage
      if (pathname === "/" && window.location.hash && hasLoadingCompleted) {
        const hash = window.location.hash.substring(1); // Remove the # symbol

        // Implement retry mechanism to ensure scrolling works
        let retryCount = 0;
        const maxRetries = 10;
        const retryInterval = 200; // 200ms between retries

        const attemptScroll = () => {
          const element = document.getElementById(hash);
          const locomotiveScroll = window.locomotiveScroll;

          // Check if both element and locomotive scroll are available
          if (element && locomotiveScroll) {
            scrollToSection(hash, 100);
            return true; // Success
          }

          // Retry if conditions aren't met and we haven't exceeded max retries
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(attemptScroll, retryInterval);
          }

          return false; // Failed
        };

        // Start the scroll attempt after a small initial delay
        setTimeout(attemptScroll, 300);
      }
    };

    // Only run when loading is completed
    if (hasLoadingCompleted) {
      handleHashScrolling();
    }
  }, [pathname, hasLoadingCompleted]);

  // Prevent body scroll when navigation is active
  useEffect(() => {
    if (isActive) {
      const stopScrolling = () => {
        // Method 4: Add event listeners to prevent scroll
        const preventScroll = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        };

        document.addEventListener("wheel", preventScroll, { passive: false });
        document.addEventListener("touchmove", preventScroll, {
          passive: false,
        });
        document.addEventListener("keydown", (e) => {
          if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
          }
        });

        // Store cleanup functions
        window.scrollPreventCleanup = () => {
          document.removeEventListener("wheel", preventScroll);
          document.removeEventListener("touchmove", preventScroll);
        };
      };

      // Use a small delay to ensure Lenis is initialized
      setTimeout(stopScrolling, 100);
    } else {
      // Resume scrolling
      const resumeScrolling = () => {
        if (window.scrollPreventCleanup) {
          window.scrollPreventCleanup();
          delete window.scrollPreventCleanup;
        }
      };

      resumeScrolling();
    }

    // Cleanup function to ensure scroll is restored
    return () => {
      if (window.scrollPreventCleanup) {
        window.scrollPreventCleanup();
        delete window.scrollPreventCleanup;
      }
    };
  }, [isActive]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight / 2,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },

        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        },
      },
    });
  });

  return (
    <>
      {isAboveBreakpoint && (
        <div ref={header} className={"header"}>
          <div className="flex-center">
            <Link href="/" aria-label="Go to homepage">
              <Image src="/images/logo.png" height={30} width={85} alt="Logo" />
            </Link>
          </div>

          <nav className={"nav"}>
            {navigationItems.map((item, index) => (
              <div key={index} className="el">
                <Magnetic>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </Link>
                </Magnetic>
                <div className={"indicator"}></div>
              </div>
            ))}
          </nav>
        </div>
      )}

      {isBelowBreakpoint && (
        <div ref={header} className={"header"}>
          <div className="flex-center">
            <Link href="/" aria-label="Go to homepage">
              <Image src="/images/logo.png" height={30} width={85} alt="Logo" />
            </Link>
          </div>
        </div>
      )}

      <div ref={button} className={"headerButtonContainer"}>
        <Magnetic>
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={`${"button"}`}
          >
            <div
              className={`${"burger"} ${isActive ? "burgerActive" : ""}`}
            ></div>
          </div>
        </Magnetic>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Nav navItems={navigationItems} />}
      </AnimatePresence>
    </>
  );
}
