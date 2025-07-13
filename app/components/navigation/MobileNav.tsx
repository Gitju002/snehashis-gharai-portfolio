"use client";
import React, { useState } from "react";
import Link from "next/link";

interface NavigationItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  navigationItems: NavigationItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ navigationItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="relative z-50 p-3 rounded-full bg-foreground text-background transition-all duration-300"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-0.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${
              isOpen ? "-rotate-45 -translate-y-0.5" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-6 right-6 z-50 bg-foreground rounded-3xl p-8 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-95 translate-x-4 pointer-events-none"
        }`}
        style={{ width: "280px" }}
      >
        {/* Menu Header */}
        <div className="flex justify-between items-center mb-8">
          <h6 className="text-background font-dm-sans text-lg font-light">
            Menu
          </h6>
          <button
            onClick={closeMenu}
            className="text-background hover:text-text-secondary transition-colors"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-6">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block text-background font-dm-sans text-2xl font-normal hover:text-text-secondary transition-colors"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
