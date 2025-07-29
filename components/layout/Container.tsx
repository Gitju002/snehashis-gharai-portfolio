import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ContainerProps {
  padding?: true | false | "none";
  children: React.ReactNode;
  className?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, padding = true }, ref) => {
    // Determine base padding classes
    const basePaddingClasses = (() => {
      if (padding === false || padding === "none") return "px-0";
      if (padding === true)
        return "px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 3xl:px-20 4xl:px-24 5xl:px-28";
      return "";
    })();

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "container",
          // Only apply base padding if no custom padding is provided in className
          !className?.includes("px-") && basePaddingClasses,
          // Custom className always takes precedence
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;


