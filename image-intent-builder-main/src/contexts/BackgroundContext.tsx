import { createContext, useContext, useState, ReactNode } from 'react';

export type BackgroundType = 
  | 'default'
  | 'fantasy-landscape'
  | 'abstract-purple'
  | 'gradient-dark'
  | 'gradient-blue'
  | 'gradient-purple';

interface BackgroundContextType {
  background: BackgroundType;
  setBackground: (bg: BackgroundType) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [background, setBackground] = useState<BackgroundType>('fantasy-landscape');

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}
