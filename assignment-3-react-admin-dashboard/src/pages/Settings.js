import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
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

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { colors, updateColors, resetColors } = useColors();
  const [selectedPreset, setSelectedPreset] = useState("Default");
  const [customColors, setCustomColors] = useState({
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
  });

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.name);
    setCustomColors(preset.colors);
    updateColors(preset.colors);
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setCustomColors((prev) => ({ ...prev, [name]: value }));
    updateColors({ [name]: value });
    setSelectedPreset("Custom");
  };

  const handleReset = () => {
    setSelectedPreset("Default");
    setCustomColors(themePresets[0].colors);
    resetColors();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Profile Settings
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
              placeholder="Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
              placeholder="john.doe@example.com"
            />
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                theme === "dark" ? "bg-primary-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Email Notifications
            </span>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Push Notifications
            </span>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Color Theme
        </h2>
        <div className="mb-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {themePresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset)}
              className={`p-3 rounded-lg border transition-colors flex flex-col items-center space-y-2 ${
                selectedPreset === preset.name
                  ? "border-primary-500 dark:border-primary-400"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex space-x-1 mb-1">
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
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Primary Color
            </label>
            <input
              type="color"
              name="primary"
              value={customColors.primary}
              onChange={handleColorChange}
              className="mt-1 w-16 h-8 p-0 border-0 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Secondary Color
            </label>
            <input
              type="color"
              name="secondary"
              value={customColors.secondary}
              onChange={handleColorChange}
              className="mt-1 w-16 h-8 p-0 border-0 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Accent Color
            </label>
            <input
              type="color"
              name="accent"
              value={customColors.accent}
              onChange={handleColorChange}
              className="mt-1 w-16 h-8 p-0 border-0 bg-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
