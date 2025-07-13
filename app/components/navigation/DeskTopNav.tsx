import React from "react";
import Link from "next/link";

interface NavigationItem {
  href: string;
  label: string;
}

interface DeskTopNavProps {
  navigationItems: NavigationItem[];
}

const DeskTopNav: React.FC<DeskTopNavProps> = ({ navigationItems }) => {
  return (
    <ul className="nav-links" role="menubar">
      {navigationItems.map((item) => (
        <li key={item.href} role="none">
          <Link
            href={item.href}
            role="menuitem"
            aria-label={`Navigate to ${item.label}`}
            className="hover:text-text-secondary transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DeskTopNav;
