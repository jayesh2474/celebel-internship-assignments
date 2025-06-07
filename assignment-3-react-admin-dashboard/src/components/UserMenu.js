import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const UserMenu = () => {
  useTheme();

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Jay Joshi
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Jay.Joshi@example.com
          </p>
        </div>
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Your Profile
        </Link>
        <Link
          to="/settings"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Settings
        </Link>
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
