import { Header } from "./components/header";
import { TaskList } from "./components/task-list";
import { MaxWidthWrapper } from "./wrapper/max-width-wrapper";

function App() {
  return (
    <>
      <MaxWidthWrapper>
        <Header />
        <TaskList />
      </MaxWidthWrapper>
    </>
  );
}

export default App;
