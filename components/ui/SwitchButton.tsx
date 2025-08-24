import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const SwitchButton = () => {
  const pathname = usePathname();

  // Determine active state based on current route
  const getActiveState = () => {
    if (pathname === "/profession") return "profession";
    if (pathname === "/passion") return "passion";
    return "profession"; // default fallback
  };

  const isActive = getActiveState();

  const types = {
    profession: "Profession",
    passion: "Passion",
  };

  return (
    <div className="switch-btn">
      {Object.entries(types).map(([key, label], index) => (
        <Link
          href={key === "profession" ? "/profession" : "/passion"}
          key={index}
        >
          <button className={`btn-icon ${isActive === key ? "active" : ""}`}>
            {label}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default SwitchButton;
