import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

const notifications = [
  {
    id: 1,
    title: "New message",
    message: "You have received a new message from John Doe",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Task completed",
    message: 'Your task "Update documentation" has been completed',
    time: "1 hour ago",
    read: true,
  },
  {
    id: 3,
    title: "New feature",
    message: "A new feature has been added to the dashboard",
    time: "2 hours ago",
    read: true,
  },
];

const Notifications = () => {
  return (
    <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Notifications
          </h3>
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            Mark all as read
          </button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg ${
                notification.read
                  ? "bg-gray-50 dark:bg-gray-700/50"
                  : "bg-primary-50 dark:bg-primary-900/20"
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BellIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
