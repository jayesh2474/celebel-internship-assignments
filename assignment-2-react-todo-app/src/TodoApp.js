import React, { useState, useEffect } from "react";
import { Plus, Trash2, Check, Filter, SortAsc, SortDesc } from "lucide-react";
import "./TodoApp.css";

// Task Input Component
const TaskInput = ({ onAddTask, error }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task.trim());
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className={`task-input ${error ? "error" : ""}`}
          maxLength={100}
        />
        <button type="submit" className="add-button">
          <Plus size={20} />
          Add
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

// Task Item Component
const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <button
        onClick={() => onToggle(task.id)}
        className={`toggle-button ${task.completed ? "checked" : ""}`}
      >
        {task.completed && <Check size={14} />}
      </button>

      <span className="task-text">{task.text}</span>

      <span className="task-date">
        {new Date(task.createdAt).toLocaleDateString()}
      </span>

      <button onClick={() => onDelete(task.id)} className="delete-button">
        <Trash2 size={16} />
      </button>
    </div>
  );
};

// Filter Controls Component
const FilterControls = ({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="filter-controls">
      <div className="filter-buttons">
        <button
          onClick={() => onFilterChange("all")}
          className={`filter-button ${filter === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange("active")}
          className={`filter-button ${filter === "active" ? "active" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => onFilterChange("completed")}
          className={`filter-button ${filter === "completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>

      <button onClick={onSortChange} className="sort-button">
        {sortOrder === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
        Sort by Date
      </button>
    </div>
  );
};

// Task Stats Component
const TaskStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  return (
    <div className="task-stats">
      <div className="stat-item">
        <span className="stat-number">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{active}</span>
        <span className="stat-label">Active</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{completed}</span>
        <span className="stat-label">Completed</span>
      </div>
    </div>
  );
};

// Main Todo App Component
const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Error loading tasks from localStorage:", e);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    // Validation
    if (!text.trim()) {
      setError("Task cannot be empty");
      return;
    }

    if (text.length > 100) {
      setError("Task must be less than 100 characters");
      return;
    }

    // Check for duplicate tasks
    if (tasks.some((task) => task.text.toLowerCase() === text.toLowerCase())) {
      setError("This task already exists");
      return;
    }

    setError("");
    const newTask = {
      id: Date.now() + Math.random(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // Filter tasks based on current filter
  const getFilteredTasks = () => {
    let filtered = tasks;

    switch (filter) {
      case "active":
        filtered = tasks.filter((task) => !task.completed);
        break;
      case "completed":
        filtered = tasks.filter((task) => task.completed);
        break;
      default:
        filtered = tasks;
    }

    // Sort tasks
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="todo-app">
      <div className="todo-container">
        <header className="app-header">
          <h1 className="app-title">Todo List</h1>
          <p className="app-subtitle">Stay organized and productive</p>
        </header>

        <TaskStats tasks={tasks} />

        <TaskInput onAddTask={addTask} error={error} />

        {tasks.length > 0 && (
          <FilterControls
            filter={filter}
            onFilterChange={setFilter}
            sortOrder={sortOrder}
            onSortChange={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          />
        )}

        <div className="tasks-container">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              {tasks.length === 0 ? (
                <>
                  <div className="empty-icon">📝</div>
                  <h3>No tasks yet</h3>
                  <p>Add your first task to get started!</p>
                </>
              ) : (
                <>
                  <div className="empty-icon">🔍</div>
                  <h3>No {filter} tasks</h3>
                  <p>Try changing your filter or add a new task.</p>
                </>
              )}
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {completedCount > 0 && (
          <div className="footer-actions">
            <button onClick={clearCompleted} className="clear-button">
              Clear {completedCount} completed task
              {completedCount !== 1 ? "s" : ""}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
