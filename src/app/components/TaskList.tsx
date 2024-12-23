"use client";
import { useState } from "react";
import { Task } from "../types/task";
import Table from "./Table";
import TaskModal from "./TaskModal";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = ["id", "tarea", "descripcion", "acciones"];
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
    setIsModalOpen(false);
  };

  const handleEditTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setEditingTask(task);
      setIsModalOpen(true);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const openModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Gestión de Tareas</h2>

      {/* Botón para abrir el modal */}
      <button className="btn bg-blue-500 text-white" onClick={openModal}>
        Nueva Tarea
      </button>

      {/* Tabla */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Tabla de Tareas</h1>
        <Table
          headers={headers}
          data={data}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddTask}
        initialData={
          editingTask
            ? { title: editingTask.title, description: editingTask.description }
            : undefined
        }
      />
    </div>
  );
};

export default TaskList;
