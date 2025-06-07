import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";

const events = [
  {
    id: 1,
    title: "Team Meeting",
    date: new Date(2024, 2, 15),
    type: "meeting",
  },
  {
    id: 2,
    title: "Project Deadline",
    date: new Date(2024, 2, 20),
    type: "deadline",
  },
  {
    id: 3,
    title: "Client Call",
    date: new Date(2024, 2, 25),
    type: "call",
  },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day) => {
    return events.filter(
      (event) => format(event.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-gray-50 dark:bg-gray-800 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={day.toString()}
                className={`min-h-[100px] bg-white dark:bg-gray-800 p-2 ${
                  !isSameMonth(day, currentDate)
                    ? "text-gray-400 dark:text-gray-600"
                    : isToday(day)
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }`}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(day, "d")}
                </div>
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-2 py-1 rounded ${
                        event.type === "meeting"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : event.type === "deadline"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
