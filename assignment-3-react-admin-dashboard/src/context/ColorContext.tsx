import React, { createContext, useContext, useState, useEffect } from 'react';

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface ColorContextType {
  colors: ColorTheme;
  updateColors: (newColors: Partial<ColorTheme>) => void;
  resetColors: () => void;
}

const defaultColors: ColorTheme = {
  primary: '#4F46E5', // indigo-600
  secondary: '#6B7280', // gray-500
  accent: '#8B5CF6', // violet-500
  background: '#F3F4F6', // gray-100
  text: '#1F2937', // gray-800
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<ColorTheme>(() => {
    const savedColors = localStorage.getItem('customColors');
    return savedColors ? JSON.parse(savedColors) : defaultColors;
  });

  useEffect(() => {
    localStorage.setItem('customColors', JSON.stringify(colors));
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-secondary', colors.secondary);
    document.documentElement.style.setProperty('--color-accent', colors.accent);
    document.documentElement.style.setProperty('--color-background', colors.background);
    document.documentElement.style.setProperty('--color-text', colors.text);
  }, [colors]);

  const updateColors = (newColors: Partial<ColorTheme>) => {
    setColors(prev => ({ ...prev, ...newColors }));
  };

  const resetColors = () => {
    setColors(defaultColors);
  };

  return (
    <ColorContext.Provider value={{ colors, updateColors, resetColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
}; 