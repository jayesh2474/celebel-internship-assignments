import React, { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  ClockIcon,
  CalendarIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 4000, profit: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398 },
  { name: "Mar", revenue: 2000, profit: 9800 },
  { name: "Apr", revenue: 2780, profit: 3908 },
  { name: "May", revenue: 1890, profit: 4800 },
  { name: "Jun", revenue: 2390, profit: 3800 },
];

const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 2000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

const recentActivities = [
  {
    id: 1,
    type: "sale",
    title: "New Sale",
    description: "John Doe purchased 3 items",
    time: "2 minutes ago",
    amount: "$299.99",
  },
  {
    id: 2,
    type: "user",
    title: "New User",
    description: "Sarah Smith joined the platform",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "notification",
    title: "System Update",
    description: "New features have been deployed",
    time: "3 hours ago",
  },
  {
    id: 4,
    type: "sale",
    title: "New Sale",
    description: "Mike Johnson purchased 1 item",
    time: "5 hours ago",
    amount: "$99.99",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Team Meeting",
    time: "10:00 AM",
    date: "Today",
    participants: 5,
  },
  {
    id: 2,
    title: "Product Launch",
    time: "2:00 PM",
    date: "Tomorrow",
    participants: 8,
  },
  {
    id: 3,
    title: "Client Call",
    time: "11:30 AM",
    date: "Tomorrow",
    participants: 3,
  },
];

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "increase",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Active Users",
    value: "2,338",
    change: "+15.3%",
    changeType: "increase",
    icon: UsersIcon,
  },
  {
    name: "Sales",
    value: "1,223",
    change: "-3.2%",
    changeType: "decrease",
    icon: ShoppingCartIcon,
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    change: "+4.1%",
    changeType: "increase",
    icon: ChartBarIcon,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");

  const timeRanges = [
    { label: "Today", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === range.value
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  stat.changeType === "increase"
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}
              >
                <stat.icon
                  className={`h-6 w-6 ${
                    stat.changeType === "increase"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === "increase" ? (
                <ArrowUpIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-sm font-medium ml-1 ${
                  stat.changeType === "increase"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                vs last period
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Revenue Overview
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                12.5%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                vs last month
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Daily Sales
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                3.2%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                vs last week
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sales" fill="#4F46E5" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    activity.type === "sale"
                      ? "bg-green-100 dark:bg-green-900"
                      : activity.type === "user"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "bg-purple-100 dark:bg-purple-900"
                  }`}
                >
                  {activity.type === "sale" ? (
                    <ShoppingCartIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : activity.type === "user" ? (
                    <UsersIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <BellIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {activity.description}
                  </p>
                  {activity.amount && (
                    <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                      {activity.amount}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {event.time}
                    </span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">
                      •
                    </span>
                    <UsersIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {event.participants} participants
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
