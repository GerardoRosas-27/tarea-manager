"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { Task } from "../types/task";

// Tipos para las acciones del reducer
type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "EDIT_TASK"; payload: Task | null };

// Estado inicial
interface TaskState {
  tasks: Task[];
  modalState: boolean;
  editingTask: Task | null;
}

const initialState: TaskState = {
  tasks: [],
  modalState: false,
  editingTask: null,
};

// Reducer para manejar el estado
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "OPEN_MODAL":
      return { ...state, modalState: true };
    case "CLOSE_MODAL":
      return { ...state, modalState: false, editingTask: null };
    case "EDIT_TASK":
      return { ...state, editingTask: action.payload, modalState: true };
    default:
      return state;
  }
};

// Tipos para el contexto
interface TaskContextProps {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}

// Crear el contexto
const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Proveedor del contexto
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook para usar el contexto
export const useTaskContext = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext debe usarse dentro de un TaskProvider");
  }
  return context;
};
