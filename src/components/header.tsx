import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateTaskDialog } from "./create-task-dialog";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
        {/* Title Section */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-light tracking-tight">
            Task Tracker
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light">
            Manage your daily objectives with precision.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex w-full sm:w-auto items-center justify-center gap-2
                     bg-primary text-white px-4 py-2 rounded-md
                     hover:bg-primary/80 transition-colors duration-300"
        >
          <Plus className="size-4" />
          New Task
        </button>
      </div>

      <CreateTaskDialog open={open} setOpen={setOpen} />
    </div>
  );
};
