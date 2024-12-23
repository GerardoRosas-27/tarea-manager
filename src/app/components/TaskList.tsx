"use client";
import { useState, useEffect } from "react";
import { Task } from "../types/task";
import Table from "./Table";
import TaskModal from "./TaskModal";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = ["id", "tarea", "descripcion", "acciones"];

  // Cargar las tareas desde la base de datos
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) throw new Error("Error al cargar las tareas");
        const data: Task[] = await response.json();
        console.log("tareas obtenidas: ",data);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (task: Omit<Task, "id">) => {
    try {
      if (editingTask) {
        // Actualizar tarea existente
        const response = await fetch(`/api/tasks`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...task, id: editingTask.id }),
        });

        if (!response.ok) throw new Error("Error al actualizar la tarea");

        const updatedTask = await response.json();
        setTasks((prev) =>
          prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
      } else {
        // Crear nueva tarea
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) throw new Error("Error al crear la tarea");

        const newTask = await response.json();
        setTasks((prev) => [...prev, newTask]);
      }

      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async (id: number) => {
    try {
      // Consultar la tarea por ID
      const response = await fetch(`/api/tasks?id=${id}`);
      if (!response.ok) throw new Error("Error al obtener la tarea");

      const task: Task = await response.json();
      console.log("obtener tarea editar: ", task)
      setEditingTask(task);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar la tarea");

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
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
          data={tasks.map((task) => ({
            id: task.id,
            tarea: task.title,
            descripcion: task.description,
          }))}
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
