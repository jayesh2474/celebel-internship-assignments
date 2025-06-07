import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  CalendarIcon,
  TableCellsIcon,
  Cog6ToothIcon,
  ViewColumnsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";
import { useColors } from "../../context/ColorContext";

const navigation = [
  { name: "Dashboard", to: "/", icon: HomeIcon },
  { name: "Analytics", to: "/charts", icon: ChartBarIcon },
  { name: "Calendar", to: "/calendar", icon: CalendarIcon },
  { name: "Tables", to: "/tables", icon: TableCellsIcon },
  { name: "Kanban", to: "/kanban", icon: ViewColumnsIcon },
  { name: "Settings", to: "/settings", icon: Cog6ToothIcon },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { colors } = useColors();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          "--primary-color": colors.primary,
          "--secondary-color": colors.secondary,
          "--accent-color": colors.accent,
        }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Dashboard
              </span>
            </div>
            {/* Close button - only visible on mobile */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`
                }
                style={{
                  "--primary-color": colors.primary,
                  "--secondary-color": colors.secondary,
                  "--accent-color": colors.accent,
                }}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    location.pathname === item.to
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                  }`}
                  style={{
                    color:
                      location.pathname === item.to
                        ? colors.primary
                        : undefined,
                  }}
                />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <span className="text-white font-medium">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    John Doe
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    john@example.com
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {isDarkMode ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
