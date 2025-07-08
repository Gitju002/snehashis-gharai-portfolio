import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const navigationItems = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
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

          {/* Navigation Links */}
          <ul className="nav-links" role="menubar">
            {navigationItems.map((item) => (
              <ul key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  aria-label={`Navigate to ${item.label}`}
                >
                  <li>{item.label}</li>
                </Link>
              </ul>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
