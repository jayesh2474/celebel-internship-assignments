import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import { useColors } from "../context/ColorContext";

const initialColumns = {
  todo: {
    id: "todo",
    title: "To Do",
    items: [
      { id: "task-1", content: "Design new dashboard layout" },
      { id: "task-2", content: "Create user documentation" },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    items: [
      { id: "task-3", content: "Implement authentication" },
      { id: "task-4", content: "Set up API endpoints" },
    ],
  },
  review: {
    id: "review",
    title: "Review",
    items: [
      { id: "task-5", content: "Code review for new features" },
      { id: "task-6", content: "Test user flows" },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    items: [
      { id: "task-7", content: "Deploy to staging" },
      { id: "task-8", content: "Update dependencies" },
    ],
  },
};

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [activeColumn, setActiveColumn] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  useTheme();
  const { colors } = useColors();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const addTask = (columnId) => {
    if (!newTaskContent.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      content: newTaskContent,
    };

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: [...columns[columnId].items, newTask],
      },
    });

    setNewTaskContent("");
    setActiveColumn(null);
  };

  const deleteTask = (columnId, taskId) => {
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: columns[columnId].items.filter((item) => item.id !== taskId),
      },
    });
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Kanban Board
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Drag and drop tasks to manage your workflow
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow"
              style={{
                "--primary-color": colors.primary,
                "--secondary-color": colors.secondary,
                "--accent-color": colors.accent,
              }}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {column.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {column.items.length} tasks
                </p>
              </div>

              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="p-4 min-h-[200px]"
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 ${
                              snapshot.isDragging
                                ? "shadow-lg"
                                : "hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-gray-900 dark:text-white">
                                {item.content}
                              </p>
                              <div className="relative">
                                <button
                                  onClick={() => setShowDeleteConfirm(item.id)}
                                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                                {showDeleteConfirm === item.id && (
                                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                                    <div className="py-1">
                                      <button
                                        onClick={() =>
                                          deleteTask(columnId, item.id)
                                        }
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
                                      >
                                        Delete Task
                                      </button>
                                      <button
                                        onClick={() =>
                                          setShowDeleteConfirm(null)
                                        }
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-600"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    {activeColumn === columnId ? (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={newTaskContent}
                          onChange={(e) => setNewTaskContent(e.target.value)}
                          placeholder="Enter task description..."
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              addTask(columnId);
                            }
                          }}
                        />
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => addTask(columnId)}
                            className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                            style={{ backgroundColor: colors.primary }}
                          >
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setActiveColumn(null);
                              setNewTaskContent("");
                            }}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveColumn(columnId)}
                        className="w-full mt-2 p-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center space-x-1 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Task</span>
                      </button>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
