import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavContextType {
  activeTabId: string | null;
  setActiveTabId: (id: string | null) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavContext.Provider value={{ 
      activeTabId, setActiveTabId, 
      isOpen, setIsOpen, 
      isMobileMenuOpen, setIsMobileMenuOpen 
    }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) throw new Error('useNav must be used within a NavProvider');
  return context;
};
