
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';

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

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index >= 0) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    openModal: (state) => {
      state.modalState = true;
    },
    closeModal: (state) => {
      state.modalState = false;
      state.editingTask = null;
    },
    editTask: (state, action: PayloadAction<Task | null>) => {
      state.editingTask = action.payload;
      state.modalState = true;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  openModal,
  closeModal,
  editTask,
} = taskSlice.actions;

export default taskSlice.reducer;
