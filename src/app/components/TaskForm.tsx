"use client";
import { useState, useEffect } from "react";
import { TaskFormProps } from "../types/task";

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al guardar la tarea");
        setLoading(false);
        return;
      }

      const savedTask = await response.json();
      onSubmit(savedTask);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error al guardar la tarea:", err);
      setError("Error inesperado al guardar la tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="w-full p-2 border rounded"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex space-x-2">
        <button
          type="submit"
          className={`bg-green-500 text-white px-4 py-2 rounded ${loading ? "opacity-50" : ""}`}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
        {onCancel && (
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
