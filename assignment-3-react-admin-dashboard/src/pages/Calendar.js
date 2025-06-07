import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import { useColors } from "../context/ColorContext";

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2024, 2, 20, 10, 0),
    end: new Date(2024, 2, 20, 11, 0),
    description: "Weekly team sync",
    type: "meeting",
  },
  {
    id: 2,
    title: "Project Deadline",
    start: new Date(2024, 2, 25, 9, 0),
    end: new Date(2024, 2, 25, 17, 0),
    description: "Submit final deliverables",
    type: "deadline",
  },
];

const eventTypes = [
  { value: "meeting", label: "Meeting", color: "#3B82F6" },
  { value: "deadline", label: "Deadline", color: "#EF4444" },
  { value: "reminder", label: "Reminder", color: "#10B981" },
  { value: "other", label: "Other", color: "#6B7280" },
];

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
    type: "meeting",
  });
  const { isDarkMode } = useTheme();
  const { colors } = useColors();

  const handleSelect = ({ start, end }) => {
    setNewEvent({
      ...newEvent,
      start,
      end,
    });
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? { ...selectedEvent } : event
        )
      );
    } else {
      setEvents([
        ...events,
        {
          ...newEvent,
          id: Date.now(),
        },
      ]);
    }
    setShowModal(false);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      description: "",
      type: "meeting",
    });
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setShowModal(false);
      setSelectedEvent(null);
    }
  };

  const eventStyleGetter = (event) => {
    const eventType = eventTypes.find((type) => type.value === event.type);
    return {
      style: {
        backgroundColor: eventType?.color || colors.primary,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Calendar
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your schedule and events
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className={isDarkMode ? "dark-theme" : ""}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100vh - 200px)" }}
            onSelectEvent={handleEventClick}
            onSelectSlot={handleSelect}
            selectable
            eventPropGetter={eventStyleGetter}
            className={`${isDarkMode ? "dark-theme" : ""}`}
            components={{
              toolbar: (props) => (
                <div className="rbc-toolbar dark:bg-gray-800 dark:text-white">
                  <div className="rbc-btn-group">
                    {props.views.map((view) => (
                      <button
                        key={view}
                        type="button"
                        className={`rbc-btn ${
                          props.view === view ? "rbc-active" : ""
                        } dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600`}
                        onClick={() => props.onView(view)}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                  <div className="rbc-toolbar-label dark:text-white">
                    {props.label}
                  </div>
                  <div className="rbc-btn-group">
                    <button
                      type="button"
                      className="rbc-btn dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      onClick={() => props.onNavigate("PREV")}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="rbc-btn dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      onClick={() => props.onNavigate("TODAY")}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      className="rbc-btn dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      onClick={() => props.onNavigate("NEXT")}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {selectedEvent ? "Edit Event" : "Add Event"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedEvent(null);
                }}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={selectedEvent?.title || newEvent.title}
                  onChange={(e) =>
                    selectedEvent
                      ? setSelectedEvent({
                          ...selectedEvent,
                          title: e.target.value,
                        })
                      : setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </label>
                <select
                  value={selectedEvent?.type || newEvent.type}
                  onChange={(e) =>
                    selectedEvent
                      ? setSelectedEvent({
                          ...selectedEvent,
                          type: e.target.value,
                        })
                      : setNewEvent({ ...newEvent, type: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={selectedEvent?.description || newEvent.description}
                  onChange={(e) =>
                    selectedEvent
                      ? setSelectedEvent({
                          ...selectedEvent,
                          description: e.target.value,
                        })
                      : setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3">
                {selectedEvent && (
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={handleSaveEvent}
                  className="px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-primary-700"
                  style={{ backgroundColor: colors.primary }}
                >
                  {selectedEvent ? "Save Changes" : "Add Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
