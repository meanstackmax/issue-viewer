import { FC, useContext } from "react";
import { IssuesContext } from "context";
import { IssuesContextValue, NullableRecord } from "types";
import { TableWrapper } from "./Dashboard.styled";
import { DashboardColumns } from "./DashboardColumns";

import Breadcrumb from "components/Breadcrumb";
import NotFound from "components/NotFound";

export const DashboardTable: FC = () => {
  const issuesContext: IssuesContextValue = useContext(IssuesContext);
  const { repo, loading } = issuesContext!;
  const issuesData = repo?.data as NullableRecord;

  if (issuesContext?.repo?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      {issuesData && (
        <Breadcrumb
          paths={[
            {
              name: (issuesData?.owner as NullableRecord)?.login as string,
              link: (issuesData?.owner as NullableRecord)?.html_url as string,
            },
            {
              name: issuesData?.name as string,
              link: issuesData?.html_url as string,
            },
          ]}
        />
      )}
      <TableWrapper loading={loading}>
        <DashboardColumns />
      </TableWrapper>
    </>
  );
};
