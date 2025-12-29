import { useEffect, useState } from "react";
import { taskApi, type Task, type TaskStatus } from "../lib/task-api";
import {
  ArrowUpDown,
  CheckCircle2,
  Circle,
  Edit3,
  Search,
  Trash2,
} from "lucide-react";
import { cn } from "../lib/utils";
import { formatDate } from "date-fns";
import { CreateTaskDialog } from "./create-task-dialog";
import { useTasks } from "../context/task-context-provider";

export const TaskList = () => {
  const { tasks, isLoading, deleteTask, updateTask } = useTasks();
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"All" | TaskStatus>("All");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase());
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const toggleTaskStatus = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const newStatus = task.status === "Done" ? "Todo" : "Done";
      updateTask(id, { status: newStatus });
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    setOpen(false);
  };

  const filteredAndSortedTasks = tasks
    .filter((t) => {
      if (filter === "All") return true;
      if (filter === "Pending") return t.status === "Todo";
      return t.status === filter;
    })
    .filter((t) => t.title.toLowerCase().includes(debouncedSearch))
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            className="border-border border  rounded-md py-1 pl-8 pr-4 w-full"
            placeholder="Search tasks..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-secondary rounded-md p-1 flex-1">
          {(["All", "Pending", "Done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                filter === f
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSortBy((s) => (s === "date" ? "title" : "date"))}
          className="flex flex-1 items-center justify-between bg-secondary px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ArrowUpDown size={14} /> Sort by {sortBy}
          </span>
        </button>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-secondary/40 animate-pulse"
            >
              <div className="h-6 w-6 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-3 w-1/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredAndSortedTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredAndSortedTasks.map((t) => (
            <div
              key={t.id}
              className="group flex items-center gap-4 bg-secondary/50 border border-white/5 p-4 rounded-2xl hover:bg-secondary transition-all hover:scale-[1.01]"
            >
              <button
                onClick={() => toggleTaskStatus(t.id)}
                className="shrink-0 transition-transform active:scale-90"
              >
                {t.status === "Done" ? (
                  <CheckCircle2 className="text-primary" size={24} />
                ) : (
                  <Circle className="text-muted-foreground" size={24} />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    "text-sm font-medium truncate",
                    t.status === "Done" && "line-through text-muted-foreground"
                  )}
                >
                  {t.title}
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {formatDate(t.dueDate, "MMM dd, yyyy")}
                </p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setEditTask(t);
                    setOpen(true);
                  }}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/40 rounded-lg transition-colors cursor-pointer"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTask(t.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-secondary p-4">
            <Search className="size-6 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-medium">No tasks found</h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-xs">
            Try adjusting your search, filters, or create a new task.
          </p>
        </div>
      )}
      <CreateTaskDialog open={open} setOpen={setOpen} editTask={editTask} />
    </div>
  );
};
