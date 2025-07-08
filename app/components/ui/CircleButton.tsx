import React from "react";

type CircleButtonProps = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

const buttonSizes = {
  sm: "w-32 h-32",
  md: "w-40 h-40",
  lg: "w-48 h-48",
  xl: "w-64 h-64",
  "2xl": "w-72 h-72",
};

const CircleButton = ({
  size = "2xl",
  className,
  onClick,
  disabled,
  type = "button",
}: CircleButtonProps) => {
  return (
    <div>
      <button
        className={`circle-btn ${buttonSizes[size]} ${className}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        <span
          className={` ${
            size === "2xl"
              ? "text-6xl"
              : size === "xl"
              ? "text-5xl"
              : size === "lg"
              ? "text-4xl"
              : size === "md"
              ? "text-3xl"
              : "text-2xl"
          } `}
        >
          Get in touch
        </span>
      </button>
    </div>
  );
};

export default CircleButton;
