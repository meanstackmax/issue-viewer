export const MOCK = [
  {
    id: "1654170249633",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "backlog",
  },
  {
    id: "1654170249634",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "in-progress",
  },
  {
    id: "1654170249635",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "backlog",
  },
  {
    id: "1654170249636",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "completed",
  },
  {
    id: "1654170249637",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "in-progress",
  },
  {
    id: "1654170249638",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "completed",
  },
  {
    id: "1654170249639",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "completed",
  },
  {
    id: "1654170249640",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "backlog",
  },
  {
    id: "1654170249641",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "backlog",
  },
  {
    id: "1654170249642",
    title: "Node.js Diagnostics WorGroup Meeting 2022-05-31",
    subtitle: "opened 5 days ago by Qard 1",
    status: "backlog",
  },
];

export const board = {
  backlog: {
    tasks: MOCK.filter(({ status }) => status === "backlog"),
  },
  in_progress: {
    tasks: MOCK.filter(({ status }) => status === "in-progress"),
  },
  completed: {
    tasks: MOCK.filter(({ status }) => status === "completed"),
  },
};

export type Board = typeof board;
export type ColumnName = keyof Board;
export type ColumnValue = Board[ColumnName];
