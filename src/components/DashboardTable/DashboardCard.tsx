import { memo, useRef, FC } from "react";
import { DashboardCardProps } from "types";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { StyledTitle, StyledSubtitle, Card } from "./Dashboard.styled";

const DashboardCard: FC<DashboardCardProps> = memo(
  ({ task, index, columnName, onMove }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "CARD",
      item: task,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }));

    const [{ handlerId }, drop] = useDrop<
      typeof task,
      void,
      { handlerId: Identifier | null }
    >({
      accept: "CARD",
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(task, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = task.order;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        onMove(columnName, dragIndex, hoverIndex);
        task.order = hoverIndex + 1;
      },
    });

    drag(drop(ref));

    if (!task) return <></>;

    return (
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Card ref={ref}>
          <StyledTitle>{task.title}</StyledTitle>
          <StyledSubtitle>{task.subtitle}</StyledSubtitle>
        </Card>
      </div>
    );
  },
);

export default DashboardCard;
