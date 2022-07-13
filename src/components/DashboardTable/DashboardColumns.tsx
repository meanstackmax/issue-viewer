import { FC, ReactNode, useCallback, useContext } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { DashboardContext } from "context";
import {
  DashboardContextValue,
  BoardColumnNames,
  Task,
  DashboardCardProps,
  Board,
} from "types";
import { transformCapitalize } from "utils/stringUtils";
import { Column, StyledHeading } from "./Dashboard.styled";

import DashboardCard from "./DashboardCard";

const DropableContainer: FC<{
  name: string;
  data: Board;
  children: (props: Pick<DashboardCardProps, "onMove"> | any) => ReactNode;
}> = ({ name, data, children }) => {
  const dashboardContext: DashboardContextValue = useContext(DashboardContext);
  const { setData } = dashboardContext!;
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (task: Task) => {
      // if (task.status === name) return;

      const updatedData = { ...data };

      const nextTargetTasks = [
        ...(updatedData[name as BoardColumnNames].tasks ?? []),
        { ...task, status: task.status },
      ];
      const previousTasks = updatedData[task.status as BoardColumnNames].tasks;
      const previousTargetTasks = previousTasks.filter(
        (_task: Task) => _task.id !== task.id,
      );
      updatedData[name as BoardColumnNames].tasks = [
        ...new Set(nextTargetTasks),
      ];
      // updatedData[task.status as BoardColumnNames].tasks = [
      //   ...previousTargetTasks,
      // ];

      setData({
        ...updatedData,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleMove = useCallback(
    (columnName: string, dragIndex: number, hoverIndex: number) => {
      const tasks = data[columnName as BoardColumnNames].tasks ?? [];
      const nextOrderTasks = update(tasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, tasks[dragIndex] as Task],
        ],
      });
      const updatedData = { ...data };
      updatedData[columnName as BoardColumnNames].tasks = nextOrderTasks;
      setData(updatedData);
    },
    [name],
  );

  return (
    <Column ref={drop}>{children({ handleMove, columnName: name })}</Column>
  );
};

export const DashboardColumns: FC = () => {
  const dashboardContext: DashboardContextValue = useContext(DashboardContext);
  const { data } = dashboardContext!;
  const byOrder = (first: Task, next: Task) => first.order - next.order;

  return (
    <Column>
      {data &&
        Object.keys(data).map((columnName) => (
          <StyledHeading key={columnName}>
            {transformCapitalize(columnName)}
            <DropableContainer data={data} name={columnName}>
              {({ handleMove, columnName }) =>
                (data[columnName as BoardColumnNames].tasks ?? [])
                  .sort(byOrder)
                  .map((task: Task, index: number) => (
                    <DashboardCard
                      key={`${task?.id}-${index}`}
                      columnName={columnName}
                      index={index}
                      task={task}
                      onMove={handleMove}
                    />
                  ))
              }
            </DropableContainer>
          </StyledHeading>
        ))}
    </Column>
  );
};
