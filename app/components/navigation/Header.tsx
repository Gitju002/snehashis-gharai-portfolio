"use client";
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
} from "@/app/hooks/media-query";
import Magnetic from "../ui/Magnetic";

type NavItem = {
  href: string;
  label: string;
};

const navigationItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Work" },
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
  const pathname = usePathname();
  const isAboveBreakpoint = useIsAboveBreakpoint("lg");
  const isBelowBreakpoint = useIsBelowBreakpoint("lg");
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Close navigation when pathname changes
    if (prevPathname.current !== pathname) {
      setIsActive(false);
      prevPathname.current = pathname;
    }
  }, [pathname]);

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
                  <Link href={item.href}>{item.label}</Link>
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
