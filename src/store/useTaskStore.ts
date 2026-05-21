import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TaskItem = {
  _id: string;
  text: string;
  completed: boolean;
  dueDate?: string | null;
  priority?: 'Baixa' | 'Média' | 'Alta';
};

type TaskState = {
  tasks: TaskItem[];

  addTask: (
    text: string,
    completed: boolean,
    dueDate: string | null,
    priority: 'Baixa' | 'Média' | 'Alta'
  ) => void;

  updateTask: (
    id: string,
    text: string,
    completed: boolean,
    dueDate: string | null,
    priority: 'Baixa' | 'Média' | 'Alta'
  ) => void;

  deleteTask: (id: string) => void;

  toggleTaskCompleted: (id: string) => void;

  deleteAllTasks: () => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (text, completed, dueDate, priority) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              _id: Date.now().toString(),
              text,
              completed,
              dueDate,
              priority,
            },
          ],
        })),

      updateTask: (id, text, completed, dueDate, priority) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id
              ? {
                  ...task,
                  text,
                  completed,
                  dueDate,
                  priority,
                }
              : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== id),
        })),

      toggleTaskCompleted: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id
              ? { ...task, completed: !task.completed }
              : task
          ),
        })),

      deleteAllTasks: () => set({ tasks: [] }),
    }),
    {
      name: 'tasks-storage',

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);