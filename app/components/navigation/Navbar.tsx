import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import DeskTopNav from "./DeskTopNav";

const Navbar = () => {
  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="nav-container"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-content">
        <div className="flex-center justify-between">
          {/* Logo/Brand */}
          <div className="flex-center">
            <Link href="/" aria-label="Go to homepage">
              <Image src="/images/logo.png" height={30} width={85} alt="Logo" />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:block">
            <DeskTopNav navigationItems={navigationItems} />
          </div>

          {/* Mobile Navigation - Hidden on desktop */}
          <div className="lg:hidden">
            <MobileNav navigationItems={navigationItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
