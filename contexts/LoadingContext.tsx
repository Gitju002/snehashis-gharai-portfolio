import React, { createContext, useContext, ReactNode } from "react";
import { usePageLoading } from "../hooks/use-page-loading";

interface LoadingContextType {
  isLoading: boolean;
  hasLoadingCompleted: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const { isLoading, hasLoadingCompleted } = usePageLoading({
    minLoadTime: 1500,
    maxLoadTime: 5000,
    imageTimeout: 3000,
  });

  return (
    <LoadingContext.Provider value={{ isLoading, hasLoadingCompleted }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};
