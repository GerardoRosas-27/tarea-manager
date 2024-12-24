"use client";
import { useEffect } from "react";
import Table from "./Table";
import TaskModal from "./TaskModal";
import { useAlert } from "../contexts/AlertContext";
import { useTaskContext } from "../contexts/TaskContext";
import {Task} from "../types/task"

const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const { tasks, modalState, editingTask } = state; 
  const { showAlert, hideAlert } = useAlert();

  const headers = ["id", "tarea", "descripcion", "acciones"];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al cargar las tareas:", errorData.error);
        showAlert(errorData.error || "Error al cargar las tareas", "error");
        return;
      }
      const data = await response.json();
      dispatch({ type: "SET_TASKS", payload: data });
    } catch (error) {
      console.error("Error inesperado al cargar las tareas:", error);
      showAlert((error as Error).message || "Error inesperado", "error");
    }
  };

  const handleSubmitTask = async (task: Task | Omit<Task, "id">) => {
    if (task && "id" in task && task.id) {
      // Si el ID está definido, actualizar la tarea
      await handleUpdateTask(task as Task);
    } else {
      // Si no hay ID, crear una nueva tarea
      await handleCreateTask(task as Omit<Task, "id">);
    }
  };
  

  const handleCreateTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al crear la tarea:", errorData.error);
        showAlert(errorData.error || "Error al crear la tarea", "error");
        return;
      }
      const newTask = await response.json();
      dispatch({ type: "ADD_TASK", payload: newTask });
      showAlert("Tarea creada correctamente", "success");
      dispatch({ type: "CLOSE_MODAL" });
    } catch (error) {
      console.error("Error inesperado al crear la tarea:", error);
      showAlert((error as Error).message || "Error inesperado", "error");
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al actualizar la tarea:", errorData.error);
        showAlert(errorData.error || "Error al actualizar la tarea", "error");
        return;
      }
      const updatedTask = await response.json();
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      showAlert("Tarea actualizada correctamente", "success");
      dispatch({ type: "CLOSE_MODAL" });
    } catch (error) {
      console.error("Error inesperado al actualizar la tarea:", error);
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
          const response = await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al eliminar la tarea:", errorData.error);
            showAlert(errorData.error || "Error desconocido", "error");
            return;
          }
          dispatch({ type: "DELETE_TASK", payload: id });
          showAlert("Tarea eliminada correctamente", "success");
        } catch (error) {
          console.error("Error inesperado al eliminar la tarea:", error);
          showAlert((error as Error).message || "Error inesperado", "error");
        }
      },
      () => {
        console.log("Eliminación cancelada");
        hideAlert();
      }
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Gestión de Tareas</h2>

      {/* Botón para abrir el modal */}
      <button
        className="btn bg-blue-500 text-white"
        onClick={() => dispatch({ type: "OPEN_MODAL" })}
      >
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
          onEdit={(id) =>
            dispatch({
              type: "EDIT_TASK",
              payload: tasks.find((task) => task.id === id) || null,
            })
          }
          onDelete={(id) => handleDeleteTask(id)}
        />
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={modalState}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        onSubmit={handleSubmitTask}
        initialData={editingTask ? editingTask : undefined}
      />
    </div>
  );
};

export default TaskList;
