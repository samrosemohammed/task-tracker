export type TaskStatus = "Todo" | "Done" | "Pending";

export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  status: TaskStatus;
}

const STORAGE_KEY = "task-tracker";

const initialTask: Task[] = [
  {
    id: "1",
    title: "Test 1",
    dueDate: new Date(),
    status: "Todo",
  },
  {
    id: "2",
    title: "Test 2",
    dueDate: new Date(),
    status: "Todo",
  },
  {
    id: "3",
    title: "Test 3",
    dueDate: new Date(),
    status: "Done",
  },
  {
    id: "4",
    title: "Test 3",
    dueDate: new Date(),
    status: "Done",
  },
  {
    id: "5",
    title: "Test 3",
    dueDate: new Date(),
    status: "Done",
  },
  {
    id: "6",
    title: "Test 3",
    dueDate: new Date(),
    status: "Done",
  },
  {
    id: "7",
    title: "Test 3",
    dueDate: new Date(),
    status: "Done",
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
