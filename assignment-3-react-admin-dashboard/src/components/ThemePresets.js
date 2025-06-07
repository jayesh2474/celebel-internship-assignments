import React from "react";
import { useColors } from "../context/ColorContext";

const themePresets = [
  {
    name: "Default",
    colors: {
      primary: "#4F46E5",
      secondary: "#6B7280",
      accent: "#8B5CF6",
    },
  },
  {
    name: "Ocean",
    colors: {
      primary: "#0EA5E9",
      secondary: "#64748B",
      accent: "#06B6D4",
    },
  },
  {
    name: "Forest",
    colors: {
      primary: "#059669",
      secondary: "#4B5563",
      accent: "#10B981",
    },
  },
  {
    name: "Sunset",
    colors: {
      primary: "#F97316",
      secondary: "#6B7280",
      accent: "#F59E0B",
    },
  },
  {
    name: "Royal",
    colors: {
      primary: "#7C3AED",
      secondary: "#4B5563",
      accent: "#8B5CF6",
    },
  },
];

const ThemePresets = () => {
  const { updateColors } = useColors();

  const handlePresetSelect = (preset) => {
    updateColors(preset.colors);
  };

  return (
    <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Theme Presets
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {themePresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset)}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="flex space-x-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.colors.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.colors.accent }}
                  />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {preset.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemePresets;
