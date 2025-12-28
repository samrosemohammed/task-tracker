import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateTaskDialog } from "./create-task-dialog";

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1>Time Tacker</h1>
          <p>Manage your daily objectives with precision.</p>
        </div>
        <div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-md cursor-pointer hover:bg-primary/80 transition-colors duration-300"
          >
            <Plus className="size-4" /> New Task
          </button>
        </div>
      </div>
      <CreateTaskDialog open={open} setOpen={setOpen} />
    </div>
  );
};
