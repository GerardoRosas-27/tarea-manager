
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// Tipos para el store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
