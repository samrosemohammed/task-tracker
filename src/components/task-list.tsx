import { useEffect, useState } from "react";
import { taskApi, type Task } from "../lib/task-api";
import { Loader2 } from "lucide-react";

export const TaskList = () => {
  const [task, setTask] = useState<Task[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    taskApi.getTasks().then((data) => {
      setTask(data);
      setIsLoading(false);
    });
  }, []);
  console.log("Task: ", task);
  return (
    <div>
      {isLoading ? (
        <div>
          <Loader2 className="animate-spin size-4" />
        </div>
      ) : null}
    </div>
  );
};
