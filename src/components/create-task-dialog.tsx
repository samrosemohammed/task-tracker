import { Loader2, X } from "lucide-react";
import { taskApi, type Task } from "../lib/task-api";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { cn } from "../lib/utils";
import { useTasks } from "../context/task-context-provider";

interface CreateTaskDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editTask?: Task | null;
}

export const CreateTaskDialog = ({
  open,
  setOpen,
  editTask,
}: CreateTaskDialogProps) => {
  if (!open) return null;
  const { addTask, updateTask } = useTasks();
  const {
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    register,
  } = useForm({
    defaultValues: {
      title: "",
      dueDate: "",
      status: "Todo",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      setValue("title", editTask.title);
      setValue("dueDate", formatDate(editTask.dueDate, "yyyy-MM-dd"));
      setValue("status", editTask.status);
    } else {
      reset();
    }
  }, [editTask, setValue]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    if (editTask) {
      await updateTask(editTask.id, data);
    } else {
      await addTask(data);
    }

    setIsLoading(false);
    reset();
    setOpen(false);
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-2"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white p-4 rounded-md relative"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-medium">Create a Task</h2>
          <p className="mb-4">Fill in the details below to add a new task.</p>
        </div>
        <X
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 size-4 cursor-pointer"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-1">
            <label>Title</label>
            <input
              {...register("title", {
                required: true,
              })}
              autoFocus
              className="w-full outline-none border rounded-md px-2 py-0.5"
            />
            {errors.title && (
              <p className="text-sm text-red-500">Title is required.</p>
            )}
          </div>
          <div className="space-y-1">
            <label>Due Date</label>
            <input
              {...register("dueDate", {
                required: true,
              })}
              type="date"
              className="w-full outline-none border rounded-md px-2 py-0.5"
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500">Due Date is required.</p>
            )}
          </div>
          <div className="space-y-1">
            <label>Status</label>
            <select
              {...register("status", {
                required: true,
              })}
              className="w-full outline-none border rounded-md px-2 py-0.5"
            >
              <option value="Todo">Todo</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-500">Status is required.</p>
            )}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-secondary px-3 py-1.5 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`${cn(
                isLoading && "opacity-70 cursor-not-allowed"
              )} bg-primary text-white px-3 py-1.5 rounded-md flex items-center gap-2`}
            >
              {isLoading ? <Loader2 className="animate-spin size-4" /> : null}
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
