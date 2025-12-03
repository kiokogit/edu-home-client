import React, { createContext, useContext, useState, useEffect } from 'react';

interface HeaderTitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

const HeaderTitleContext = createContext<HeaderTitleContextType | undefined>(undefined);

export function HeaderTitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('Dashboard');

  return (
    <HeaderTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderTitleContext.Provider>
  );
}

export function useHeaderTitle(newTitle?: string) {
  const context = useContext(HeaderTitleContext);
  if (context === undefined) {
    throw new Error('useHeaderTitle must be used within a HeaderTitleProvider');
  }

  useEffect(() => {
    if (newTitle) {
      context.setTitle(newTitle);
    }
  }, [newTitle, context]);

  return context;
}
