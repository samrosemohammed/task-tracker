import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { taskApi, type Task } from "../lib/task-api";

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  refreshTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTasks = async () => {
    setIsLoading(true);
    const data = await taskApi.getTasks();
    setTasks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const addTask = async (taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
    };
    const updatedTasks = [...tasks, newTask];
    await taskApi.saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    await taskApi.saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    await taskApi.saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        refreshTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
};
