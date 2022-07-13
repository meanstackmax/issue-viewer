export type Task = {
  id: string;
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
  status: string;
  order: number;
};
export type DashboardCardProps = {
  onMove: (columnName: string, dragIndex: number, hoverIndex: number) => void;
  columnName: string;
  task: Task;
  index: number;
};
export type BoardColumnNames = "backlog" | "in_progress" | "completed";
export type Tasks = { tasks: Task[] };
export type Board = {
  backlog: Tasks;
  in_progress: Tasks;
  completed: Tasks;
};
export type NullableRecord = Record<
  string,
  unknown | Record<string, unknown>
> | null;
type FetchData = (repoName: string) => Promise<void>;
export type IssuesContextValue = {
  repo: NullableRecord;
  issues: NullableRecord;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  saveUserConfig: (jsonObject: Record<string, unknown>) => void;
  getUserConfig: (key: string) => NullableRecord;
  fetchRepo: FetchData;
  fetchIssues: FetchData;
} | null;
export type DashboardContextValue = {
  data: Board | undefined;
  setData: React.Dispatch<React.SetStateAction<Board | undefined>>;
  updateStorage: () => void;
} | null;
