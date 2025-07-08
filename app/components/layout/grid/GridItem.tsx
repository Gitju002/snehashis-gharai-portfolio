import type React from "react";
import type { GridLayoutType } from "./Grid";
import { cn } from "@/app/lib/utils";

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  layout?: GridLayoutType;
  border?: boolean;
}

export function GridItem({
  children,
  colSpan = 1,
  rowSpan = 1,
  className,
  layout = "standard",
  border = false,
}: GridItemProps) {
  // Generate column span classes
  const getColSpanClass = () => {
    if (layout !== "standard" && layout !== "bento") return "";

    switch (colSpan) {
      case 1:
        return "col-span-1";
      case 2:
        return "col-span-1 sm:col-span-2";
      case 3:
        return "col-span-1 sm:col-span-2 md:col-span-3";
      case 4:
        return "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4";
      case 5:
        return "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5";
      case 6:
        return "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-6";
      case 12:
        return "col-span-full";
      default:
        return "col-span-1";
    }
  };

  // Generate row span classes
  const getRowSpanClass = () => {
    if (layout !== "standard" && layout !== "bento") return "";

    switch (rowSpan) {
      case 1:
        return "row-span-1";
      case 2:
        return "row-span-2";
      case 3:
        return "row-span-3";
      case 4:
        return "row-span-4";
      case 5:
        return "row-span-5";
      case 6:
        return "row-span-6";
      default:
        return "row-span-1";
    }
  };

  // Border class for visualization
  const borderClass = border ? "border border-dashed border-gray-300" : "";

  return (
    <div
      className={cn(
        getColSpanClass(),
        getRowSpanClass(),
        borderClass,
        className
      )}
    >
      {children}
    </div>
  );
}
