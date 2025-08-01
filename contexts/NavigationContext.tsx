import React, { createContext, useContext, useState, ReactNode } from "react";

type NavigationContextType = {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider"
    );
  }
  return context;
};

type NavigationProviderProps = {
  children: ReactNode;
};

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <NavigationContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};
