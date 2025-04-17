'use client';

import { createContext, useContext, useState } from 'react';

const SparklesContext = createContext<{
  visible: boolean;
  toggle: () => void;
} | undefined>(undefined);

export const SparklesProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(true);

  const toggle = () => setVisible(prev => !prev);

  return (
    <SparklesContext.Provider value={{ visible, toggle }}>
      {children}
    </SparklesContext.Provider>
  );
};

export const useSparkles = () => {
  const context = useContext(SparklesContext);
  if (context === undefined) {
    throw new Error('useSparkles must be used within a SparklesProvider');
  }
  return context;
};
