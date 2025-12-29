import { Header } from "./components/header";
import { TaskList } from "./components/task-list";
import { TaskProvider } from "./context/task-context-provider";
import { MaxWidthWrapper } from "./wrapper/max-width-wrapper";

function App() {
  return (
    <>
      <TaskProvider>
        <MaxWidthWrapper className="min-h-screen">
          <Header />
          <TaskList />
        </MaxWidthWrapper>
      </TaskProvider>
    </>
  );
}

export default App;
