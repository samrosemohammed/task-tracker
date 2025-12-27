import { X } from "lucide-react";

interface CreateTaskDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateTaskDialog = ({ open, setOpen }: CreateTaskDialogProps) => {
  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/20 flex items-center justify-center"
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
        <form className="space-y-2">
          <div>
            <label>Title</label>
            <input
              autoFocus
              className="w-full outline-none border rounded-md px-2 py-0.5"
            />
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              className="w-full outline-none border rounded-md px-2 py-0.5"
            />
          </div>
          <div>
            <label>Status</label>
            <select className="w-full outline-none border rounded-md px-2 py-0.5">
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
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
              className="bg-primary text-white px-3 py-1.5 rounded-md cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
