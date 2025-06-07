import React, { createContext, useContext, useState, useEffect } from "react";

const defaultColors = {
  primary: "#4F46E5", // indigo-600
  secondary: "#6B7280", // gray-500
  accent: "#8B5CF6", // violet-500
  background: "#F3F4F6", // gray-100
  text: "#1F2937", // gray-800
};

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState(() => {
    const savedColors = localStorage.getItem("customColors");
    return savedColors ? JSON.parse(savedColors) : defaultColors;
  });

  const updateCSSVariables = (newColors) => {
    // Update primary color variations
    document.documentElement.style.setProperty(
      "--color-primary-50",
      adjustColor(newColors.primary, 95)
    );
    document.documentElement.style.setProperty(
      "--color-primary-100",
      adjustColor(newColors.primary, 90)
    );
    document.documentElement.style.setProperty(
      "--color-primary-200",
      adjustColor(newColors.primary, 80)
    );
    document.documentElement.style.setProperty(
      "--color-primary-300",
      adjustColor(newColors.primary, 70)
    );
    document.documentElement.style.setProperty(
      "--color-primary-400",
      adjustColor(newColors.primary, 60)
    );
    document.documentElement.style.setProperty(
      "--color-primary-500",
      adjustColor(newColors.primary, 50)
    );
    document.documentElement.style.setProperty(
      "--color-primary",
      newColors.primary
    );
    document.documentElement.style.setProperty(
      "--color-primary-700",
      adjustColor(newColors.primary, -20)
    );
    document.documentElement.style.setProperty(
      "--color-primary-800",
      adjustColor(newColors.primary, -30)
    );
    document.documentElement.style.setProperty(
      "--color-primary-900",
      adjustColor(newColors.primary, -40)
    );

    // Update secondary color variations
    document.documentElement.style.setProperty(
      "--color-secondary-50",
      adjustColor(newColors.secondary, 95)
    );
    document.documentElement.style.setProperty(
      "--color-secondary-100",
      adjustColor(newColors.secondary, 90)
    );
    document.documentElement.style.setProperty(
      "--color-secondary-200",
      adjustColor(newColors.secondary, 80)
    );
    document.documentElement.style.setProperty(
      "--color-secondary-300",
      adjustColor(newColors.secondary, 70)
    );
    document.documentElement.style.setProperty(
      "--color-secondary-400",
      adjustColor(newColors.secondary, 60)
    );
    document.documentElement.style.setProperty(
      "--color-secondary-500",
      adjustColor(newColors.secondary, 50)
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      newColors.secondary
    );
    document.documentElement.style.setProperty(
      "--color-secondary-600",
      adjustColor(newColors.secondary, -20)
    );
    document.documentElement.style.setProperty(
      "--color-secondary-700",
      adjustColor(newColors.secondary, -30)
    );
    document.documentElement.style.setProperty(
      "--color-secondary-800",
      adjustColor(newColors.secondary, -40)
    );
    document.documentElement.style.setProperty(
      "--color-secondary-900",
      adjustColor(newColors.secondary, -50)
    );

    // Update accent color variations
    document.documentElement.style.setProperty(
      "--color-accent-50",
      adjustColor(newColors.accent, 95)
    );
    document.documentElement.style.setProperty(
      "--color-accent-100",
      adjustColor(newColors.accent, 90)
    );
    document.documentElement.style.setProperty(
      "--color-accent-200",
      adjustColor(newColors.accent, 80)
    );
    document.documentElement.style.setProperty(
      "--color-accent-300",
      adjustColor(newColors.accent, 70)
    );
    document.documentElement.style.setProperty(
      "--color-accent-400",
      adjustColor(newColors.accent, 60)
    );
    document.documentElement.style.setProperty(
      "--color-accent-500",
      adjustColor(newColors.accent, 50)
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      newColors.accent
    );
    document.documentElement.style.setProperty(
      "--color-accent-600",
      adjustColor(newColors.accent, -20)
    );
    document.documentElement.style.setProperty(
      "--color-accent-700",
      adjustColor(newColors.accent, -30)
    );
    document.documentElement.style.setProperty(
      "--color-accent-800",
      adjustColor(newColors.accent, -40)
    );
    document.documentElement.style.setProperty(
      "--color-accent-900",
      adjustColor(newColors.accent, -50)
    );
  };

  useEffect(() => {
    localStorage.setItem("customColors", JSON.stringify(colors));
    updateCSSVariables(colors);
  }, [colors]);

  const updateColors = (newColors) => {
    setColors((prev) => ({ ...prev, ...newColors }));
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

// Helper function to adjust color brightness
const adjustColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
};
