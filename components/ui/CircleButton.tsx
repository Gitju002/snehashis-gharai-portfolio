import React from "react";

type CircleButtonProps = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  children: React.ReactNode;
  ariaLabel?: string;
  ref?: React.Ref<HTMLButtonElement>;
};

const buttonSizes = {
  sm: "w-32 h-32",
  md: "md:w-48 md:h-48 w-32 h-32",
  lg: "lg:w-56 lg:h-56 md:w-48 md:h-48 w-32 h-32",
  xl: "xl:w-64 xl:h-64 lg:w-56 lg:h-56 md:w-48 md:h-48 w-32 h-32",
  "2xl":
    "2xl:w-72 2xl:h-72 xl:w-64 xl:h-64 lg:w-56 lg:h-56 md:w-48 md:h-48 w-32 h-32",
};

const CircleButton = ({
  size = "2xl",
  className,
  onClick,
  disabled,
  type = "button",
  ariaLabel = "Circle Button",
  children,
  ref,
}: CircleButtonProps) => {
  return (
    <div>
      <button
        ref={ref}
        className={`circle-btn ${buttonSizes[size]} ${className}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
        aria-label={ariaLabel}
      >
        <span
          className={` ${
            size === "2xl"
              ? "2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-xl"
              : size === "xl"
              ? "xl:text-5xl lg:text-4xl md:text-3xl text-xl"
              : size === "lg"
              ? "lg:text-4xl md:text-3xl text-xl"
              : size === "md"
              ? "md:text-3xl text-xl"
              : "text-xl"
          } `}
        >
          {children}
        </span>
      </button>
    </div>
  );
};

export default CircleButton;
