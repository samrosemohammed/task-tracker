export type TaskStatus = "Todo" | "In Progress" | "Complete";

export interface Task {
  id: string;
  title: string;
  dueData: string;
  status: TaskStatus;
}

const STORAGE_KEY = "task-tracker";

const initialTask: Task[] = [
  {
    id: "1",
    title: "Test 1",
    dueData: "2025-01-15",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Test 2",
    dueData: "2025-01-15",
    status: "Todo",
  },
  {
    id: "3",
    title: "Test 3",
    dueData: "2025-01-15",
    status: "Complete",
  },
];

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (typeof window === "undefined") return initialTask;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTask;
  },
  saveTasks: async (task: Task[]): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
  },
};
