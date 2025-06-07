import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useColors } from "../context/ColorContext";
import {
  UserCircleIcon,
  BellIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

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
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: UserCircleIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "appearance", name: "Appearance", icon: PaintBrushIcon },
    { id: "security", name: "Security", icon: ShieldCheckIcon },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? "border-primary-500 text-primary-600 dark:text-primary-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }
                `}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <UserCircleIcon className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                    Change Avatar
                  </button>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    placeholder="Jay"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    placeholder="Joshi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    placeholder="Jay.Joshi@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-primary-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Push Notifications
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-primary-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Marketing Emails
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive emails about new products and features
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-primary-600"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark theme
                  </p>
                </div>
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

              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Color Theme
                </h3>
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
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type="color"
                        name="primary"
                        value={customColors.primary}
                        onChange={handleColorChange}
                        className="w-16 h-8 p-0 border-0 bg-transparent"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {customColors.primary}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Secondary Color
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type="color"
                        name="secondary"
                        value={customColors.secondary}
                        onChange={handleColorChange}
                        className="w-16 h-8 p-0 border-0 bg-transparent"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {customColors.secondary}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Accent Color
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type="color"
                        name="accent"
                        value={customColors.accent}
                        onChange={handleColorChange}
                        className="w-16 h-8 p-0 border-0 bg-transparent"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {customColors.accent}
                      </span>
                    </div>
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
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Change Password
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
