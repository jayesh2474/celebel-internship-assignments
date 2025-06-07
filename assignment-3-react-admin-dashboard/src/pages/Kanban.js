import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialColumns = {
  todo: {
    id: "todo",
    title: "To Do",
    items: [
      { id: "1", content: "Design new dashboard layout" },
      { id: "2", content: "Implement user authentication" },
      { id: "3", content: "Create API documentation" },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    items: [
      { id: "4", content: "Fix navigation bugs" },
      { id: "5", content: "Optimize database queries" },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    items: [
      { id: "6", content: "Setup development environment" },
      { id: "7", content: "Create project structure" },
    ],
  },
};

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);

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

  return (
    <div className="p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {column.title}
                </h2>
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
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-50 dark:bg-gray-700 p-3 mb-3 rounded-lg shadow-sm"
                          >
                            <p className="text-gray-900 dark:text-white">
                              {item.content}
                            </p>
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
