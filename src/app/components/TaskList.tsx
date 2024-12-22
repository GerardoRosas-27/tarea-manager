"use client";
import { useState } from "react";
import { Task } from "../types/task";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import Table from "./Table";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const headers = ["id","tarea", "descripcion", "acciones"];
  const data = tasks.map((task) => ({
    id: task.id,
    tarea: task.title,
    descripcion: task.description,
  }));

  const handleAddTask = (task: Omit<Task, "id">) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...task } : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    }
  };

  const handleEditTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) setEditingTask(task);
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Gestión de Tareas</h2>
      <TaskForm
        onSubmit={handleAddTask}
        initialData={
          editingTask
            ? { title: editingTask.title, description: editingTask.description }
            : undefined
        }
        onCancel={() => setEditingTask(null)}
      />
  
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Tabla de Ejemplo</h1>
        <Table
          headers={headers}
          data={data}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default TaskList;
