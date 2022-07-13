import { lazy, Suspense, FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IssuesContextProvider, DashboardContextProvider } from "context";

const DashboardTable = lazy(() => import("components/DashboardTable"));
const SearchInput = lazy(() => import("components/SearchInput"));

const App: FC = () => (
  <IssuesContextProvider>
    <DashboardContextProvider>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchInput />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <DndProvider backend={HTML5Backend}>
            <DashboardTable />
          </DndProvider>
        </Suspense>
      </div>
    </DashboardContextProvider>
  </IssuesContextProvider>
);

export default App;
