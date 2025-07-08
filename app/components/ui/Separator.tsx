import React from "react";

type SeparatorProps = {
  width?: "100%" | "75%" | "50%" | "25%";
};

const Separator = ({ width = "100%" }: SeparatorProps) => {
  const widthClasses = {
    "100%": "w-full",
    "75%": "w-3/4",
    "50%": "w-1/2",
    "25%": "w-1/4",
  };

  return (
    <hr className={`border-b border-separator my-4 ${widthClasses[width]}`} />
  );
};

export default Separator;
