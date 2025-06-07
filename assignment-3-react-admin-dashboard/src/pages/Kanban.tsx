import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Task {
  id: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 'task-1', content: 'Design new dashboard layout', priority: 'high' },
      { id: 'task-2', content: 'Implement dark mode', priority: 'medium' },
      { id: 'task-3', content: 'Add user authentication', priority: 'high' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: 'task-4', content: 'Create API endpoints', priority: 'medium' },
      { id: 'task-5', content: 'Write documentation', priority: 'low' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'task-6', content: 'Setup project structure', priority: 'high' },
      { id: 'task-7', content: 'Install dependencies', priority: 'low' },
    ],
  },
];

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find((col) => col.id === source.droppableId);
      const destColumn = columns.find((col) => col.id === destination.droppableId);
      if (!sourceColumn || !destColumn) return;

      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setColumns(
        columns.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, tasks: sourceTasks };
          }
          if (col.id === destination.droppableId) {
            return { ...col, tasks: destTasks };
          }
          return col;
        })
      );
    } else {
      const column = columns.find((col) => col.id === source.droppableId);
      if (!column) return;

      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);

      setColumns(
        columns.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, tasks: copiedTasks };
          }
          return col;
        })
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Kanban Board</h1>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {column.title}
              </h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {task.content}
                              </p>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
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