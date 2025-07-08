import { cn } from "@/app/lib/utils";
import { forwardRef } from "react";

interface VStackProps {
  padding?: true | false | "none";
  children: React.ReactNode;
  className?: string;
}

const VStack = forwardRef<HTMLDivElement, VStackProps>(
  ({ children, className, padding = true }, ref) => {
    // Determine base padding classes
    const basePaddingClasses = (() => {
      if (padding === false || padding === "none") return "py-0";
      if (padding === true) return "py-8 lg:py-24";
      return "";
    })();

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "w-full",
          // Only apply base padding if no custom padding is provided in className
          !className?.includes("py-") && basePaddingClasses,
          // Custom className always takes precedence
          className
        )}
      >
        {children}
      </div>
    );
  }
);

VStack.displayName = "Section";

export default VStack;
