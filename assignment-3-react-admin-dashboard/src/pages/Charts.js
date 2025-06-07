import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

const barData = [
  { name: "Jan", revenue: 4000, target: 3500 },
  { name: "Feb", revenue: 3000, target: 3200 },
  { name: "Mar", revenue: 2000, target: 2800 },
  { name: "Apr", revenue: 2780, target: 2500 },
  { name: "May", revenue: 1890, target: 2200 },
  { name: "Jun", revenue: 2390, target: 2400 },
];

const lineData = [
  { name: "Jan", sales: 2400, profit: 1800 },
  { name: "Feb", sales: 1398, profit: 1200 },
  { name: "Mar", sales: 9800, profit: 8500 },
  { name: "Apr", sales: 3908, profit: 3200 },
  { name: "May", sales: 4800, profit: 4200 },
  { name: "Jun", sales: 3800, profit: 3400 },
];

const pieData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
];

const areaData = [
  { name: "Jan", growth: 400, users: 2400 },
  { name: "Feb", growth: 300, users: 2700 },
  { name: "Mar", growth: 200, users: 2900 },
  { name: "Apr", growth: 278, users: 3178 },
  { name: "May", growth: 189, users: 3367 },
  { name: "Jun", growth: 239, users: 3606 },
];

const COLORS = ["#4F46E5", "#8B5CF6", "#06B6D4", "#F59E0B"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = () => {
  const [timeRange, setTimeRange] = useState("6M");

  const timeRanges = [
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Revenue vs Target
            </h3>
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
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="revenue" fill="#4F46E5" name="Revenue" />
                <Bar dataKey="target" fill="#8B5CF6" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Sales & Profit
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                3.2%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                vs last month
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  name="Sales"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Product Distribution
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                8.1%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                vs last month
              </span>
            </div>
          </div>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              User Growth
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                15.3%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                vs last month
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="growth"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorGrowth)"
                  name="Growth"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Total Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
