"use client";
import { useState, useEffect } from "react";
import { Task } from "../types/task";
import Table from "./Table";
import TaskModal from "./TaskModal";
import { useAlert } from "../contexts/AlertContext";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = ["id", "tarea", "descripcion", "acciones"];
  const { showAlert, hideAlert } = useAlert();

  // Cargar las tareas desde la base de datos
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (id?: number) => {
    try {
      const endpoint = id ? `/api/tasks?id=${id}` : "/api/tasks";
      const response = await fetch(endpoint);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al cargar las tareas:", errorData.error);
        showAlert(
          errorData.error || `Error al cargar las tareas${id ? ` con ID ${id}` : ""}`,
          "error"
        );
        return;
      }
  
      const data = await response.json();
  
      if (id) {
        return data as Task; // Devuelve la tarea específica
      } else {
        setTasks(data as Task[]); // Actualiza el estado con todas las tareas
      }
    } catch (error) {
      console.error(error);
      showAlert((error as Error).message || "Error inesperado", "error");
    }
  };
  
  const handleEditTask = async (id: number) => {
    const task = await fetchTasks(id);
    if (task) {
      setEditingTask(task); 
      setIsModalOpen(true);
    }
  };
  const handleCreateTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al crear la tarea:", errorData.error);
        showAlert(errorData.error || "Error al crear la tarea", "error");
        return;
      }

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      showAlert("Tarea guardada correctamente.", "success");

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      showAlert((error as Error).message || "Error inesperado", "error");
    }
  };

 
  
  const handleUpdateTask = async (task: Task) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al actualizar la tarea:", errorData.error);
        showAlert(errorData.error || "Error al actualizar la tarea", "error");
        return;
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      showAlert("Tarea actualizada correctamente.", "success");

      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
      showAlert((error as Error).message || "Error inesperado", "error");
    }
  };

  const handleDeleteTask = async (id: number) => {
    showAlert(
      "¿Estás seguro de que deseas eliminar esta tarea?",
      "error",
      "confirm",
      async () => {
        try {
          const response = await fetch(`/api/tasks?id=${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            const errorData = await response.json(); // Analiza el cuerpo de la respuesta
            console.error("Error al eliminar la tarea:", errorData.error);
            showAlert(errorData.error || "Error desconocido", "error"); // Muestra el mensaje de error en la alerta
            return;
          }

          setTasks((prev) => prev.filter((t) => t.id !== id));
          showAlert("Tarea eliminada correctamente.", "success"); // Mensaje de éxito
        } catch (error) {
          console.error("Error al eliminar la tarea:", error);
          showAlert((error as Error).message || "Error inesperado", "error");
        }
      },
      () => {
        console.log("Eliminación cancelada");
        hideAlert();
      }
    );
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
        onSubmit={(task) => {
          if (task.id) {
            handleUpdateTask(task as Task); // Forzamos el tipo Task porque `id` está definido
          } else {
            handleCreateTask(task as Omit<Task, "id">); // Forzamos Omit<Task, "id"> porque no tiene `id`
          }
        }}
        initialData={editingTask ? editingTask : undefined}
      />
    </div>
  );
};

export default TaskList;
