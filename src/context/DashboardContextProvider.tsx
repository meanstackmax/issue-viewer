import {
  createContext,
  FC,
  ReactNode,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { IssuesContext } from "context";
import { DashboardContextValue } from "types";
import { relativeTimeFormat } from "utils/dateUtils";
import { Board, Task, Tasks } from "types";

const DEFAULT_DATA = null;
export const DashboardContext =
  createContext<DashboardContextValue>(DEFAULT_DATA);

export const DashboardContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const issuesContext: any = useContext(IssuesContext);
  const repoID = issuesContext?.repo?.data?.id;
  const [data, setData] = useState<Board>();

  useEffect(() => {
    let config = {};

    if (localStorage.getItem(repoID)) {
      config = { ...issuesContext?.getUserConfig(repoID) };
    }

    const differenceInDays =
      new Date().getDate() -
      new Date(issuesContext?.issues?.data[0]?.created_at).getDate();

    const issues = issuesContext?.issues?.data?.map(
      (i: Record<string, Record<string, unknown> & string>, idx: number) => {
        const _item = {
          id: i.id,
          title: i.title,
          subtitle: `opened ${
            !differenceInDays ? "today" : relativeTimeFormat(differenceInDays)
          } by ${i.user.login}`,
        };

        if (!!Object.keys(config).length) {
          const foundItem = config[repoID as keyof typeof config];
          const configData =
            foundItem &&
            Object.values(foundItem)
              .map((i: unknown) => (i as Tasks).tasks)
              .flat();
          const currentItem = (configData as any).find(
            (task: Task) => task.id === i.id,
          );

          if (currentItem) {
            return {
              ..._item,
              status: currentItem.status,
              order: currentItem.order,
            };
          }
        }

        return {
          ..._item,
          status: "backlog",
          order: idx + 1,
        };
      },
    );

    const getTask = (name: string) =>
      issues?.filter((task: Task) => task.status === name) ?? [];

    const board = {
      backlog: {
        tasks: getTask("backlog"),
      },
      in_progress: {
        tasks: getTask("in_progress"),
      },
      completed: {
        tasks: getTask("completed"),
      },
    };

    if (
      [
        ...getTask("backlog"),
        ...getTask("in_progress"),
        ...getTask("completed"),
      ].length
    ) {
      setData(board);
      issuesContext?.setLoading(false);
    }
  }, [issuesContext]);

  const updateStorage = useCallback(() => {
    if (repoID) {
      const getTasks = (key: string) =>
        (data?.[key as keyof typeof data]?.tasks ?? []).map((task: any) => ({
          id: task.id,
          status: task.status,
          order: task.order,
        }));

      const backup = {
        backlog: {
          tasks: getTasks("backlog"),
        },
        in_progress: {
          tasks: getTasks("in_progress"),
        },
        completed: {
          tasks: getTasks("completed"),
        },
      };

      void issuesContext?.saveUserConfig({ key: repoID, data: backup });
    }
  }, [data]);

  useEffect(() => {
    if (repoID) {
      const getTasks = (key: string) =>
        (data?.[key as keyof typeof data]?.tasks ?? []).map((task: any) => ({
          id: task?.id,
          status: task?.status,
          order: task?.order,
        }));

      const backup = {
        backlog: {
          tasks: getTasks("backlog"),
        },
        in_progress: {
          tasks: getTasks("in_progress"),
        },
        completed: {
          tasks: getTasks("completed"),
        },
      };

      void issuesContext?.saveUserConfig({ key: repoID, data: backup });
    }
    // updateStorage();
  }, [data, repoID]);

  return (
    <DashboardContext.Provider value={{ data, setData, updateStorage }}>
      {children}
    </DashboardContext.Provider>
  );
};
