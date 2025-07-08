"use client";
import { useState, useEffect } from "react";
import { GridItem } from "./GridItem";
import { cn } from "@/app/lib/utils";

export type GridLayoutType = "standard" | "bento" | "masonry";
export type GridColsType =
  | "cols-1"
  | "cols-2"
  | "cols-3"
  | "cols-4"
  | "cols-5"
  | "cols-6"
  | "cols-12";

export interface GridProps {
  children?: React.ReactNode;
  data?: Array<{
    id: string | number;
    content: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    className?: string;
  }>;
  cols?: GridColsType;
  layout?: GridLayoutType;
  gap?: number;
  margin?: number;
  border?: boolean;
  className?: string;
  itemClassName?: string;
  debug?: boolean;
}

export default function Grid({
  children,
  data,
  cols = "cols-3",
  layout = "standard",
  gap = 4,
  margin = 0,
  border = false,
  className,
  itemClassName,
  debug = false,
}: GridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Convert gap and margin to Tailwind classes
  const gapClass = `gap-${gap}`;
  const marginClass = margin ? `m-${margin}` : "";

  // Generate grid columns class based on the cols prop
  const getGridColsClass = () => {
    const baseClass = "grid";

    switch (cols) {
      case "cols-1":
        return `${baseClass} grid-cols-1`;
      case "cols-2":
        return `${baseClass} grid-cols-1 sm:grid-cols-2`;
      case "cols-3":
        return `${baseClass} grid-cols-1 sm:grid-cols-2 md:grid-cols-3`;
      case "cols-4":
        return `${baseClass} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
      case "cols-5":
        return `${baseClass} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`;
      case "cols-6":
        return `${baseClass} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6`;
      case "cols-12":
        return `${baseClass} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12`;
      default:
        return `${baseClass} grid-cols-1 sm:grid-cols-2 md:grid-cols-3`;
    }
  };

  // Generate the grid container class based on layout type
  const getGridContainerClass = () => {
    let gridClass = getGridColsClass();

    if (layout === "masonry" && mounted) {
      // For masonry, we'll use column-count in CSS instead of grid
      return "masonry-grid";
    }

    if (layout === "bento") {
      gridClass += " grid-flow-dense";
    }

    return gridClass;
  };

  // Border class for visualization
  const borderClass = border ? "border border-dashed border-gray-300" : "";

  // Debug class for development
  const debugClass = debug ? "debug-grid" : "";

  // Render grid items based on data prop
  const renderGridItems = () => {
    if (!data) return null;

    return data.map((item) => (
      <GridItem
        key={item.id}
        colSpan={item.colSpan}
        rowSpan={item.rowSpan}
        className={cn(itemClassName, item.className)}
        layout={layout}
        border={border}
      >
        {item.content}
      </GridItem>
    ));
  };

  // For masonry layout, we need a different approach
  if (layout === "masonry" && mounted) {
    const columnCount =
      {
        "cols-1": 1,
        "cols-2": 2,
        "cols-3": 3,
        "cols-4": 4,
        "cols-5": 5,
        "cols-6": 6,
        "cols-12": 12,
      }[cols] || 3;

    const masonryStyle = {
      columnCount: columnCount,
      columnGap: `${gap * 0.25}rem`,
      margin: `${margin * 0.25}rem`,
    };

    return (
      <div
        className={cn(
          "masonry-container",
          marginClass,
          borderClass,
          debugClass,
          className
        )}
        style={masonryStyle}
      >
        {data
          ? data.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "masonry-item break-inside-avoid mb-4",
                  border && "border border-dashed border-gray-300",
                  itemClassName,
                  item.className
                )}
              >
                {item.content}
              </div>
            ))
          : children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        getGridContainerClass(),
        gapClass,
        marginClass,
        borderClass,
        debugClass,
        className
      )}
    >
      {data ? renderGridItems() : children}
    </div>
  );
}
