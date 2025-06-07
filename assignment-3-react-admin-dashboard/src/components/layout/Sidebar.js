import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  TableCellsIcon,
  CalendarIcon,
  ViewColumnsIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", to: "/", icon: HomeIcon },
  { name: "Tables", to: "/tables", icon: TableCellsIcon },
  { name: "Calendar", to: "/calendar", icon: CalendarIcon },
  { name: "Kanban", to: "/kanban", icon: ViewColumnsIcon },
  { name: "Charts", to: "/charts", icon: ChartBarIcon },
  { name: "Settings", to: "/settings", icon: Cog6ToothIcon },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-200 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:inset-auto`}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Admin
            </h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-primary-100 text-primary-900 dark:bg-primary-900/20 dark:text-primary-100"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`
                }
              >
                <item.icon
                  className="mr-3 h-6 w-6 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
