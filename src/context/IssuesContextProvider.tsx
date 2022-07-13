import { createContext, FC, ReactNode, useState } from "react";
import { IssuesContextValue } from "types";
import { getRepoIssues, getRepo } from "api/octokit";

// TODO: remove Mock
const REPO = { owner: "nodejs", repo: "diagnostics" };

const DEFAULT_DATA = null;
export const IssuesContext = createContext<IssuesContextValue>(DEFAULT_DATA);

export const IssuesContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [issues, setIssues] = useState<Record<string, unknown> | null>(
    DEFAULT_DATA,
  );
  const [repo, setRepo] = useState<Record<string, unknown> | null>(
    DEFAULT_DATA,
  );
  const [loading, setLoading] = useState(false);

  const fetchIssues = async (repoName: string) => {
    void setLoading(true);
    const { data, status } = await getRepoIssues(
      repoName ? { owner: REPO.owner, repo: repoName } : REPO,
    );

    void setIssues({ data, status });
    // void setLoading(false);
  };

  const fetchRepo = async (repoName: string) => {
    const { data, status } = await getRepo(
      repoName ? { owner: REPO.owner, repo: repoName } : REPO,
    );

    void setRepo({ data, status });
  };

  const saveUserConfig = (jsonObject: Record<string, unknown>) =>
    localStorage.setItem(
      jsonObject.key as string,
      JSON.stringify({ [jsonObject.key as string]: jsonObject.data }),
    );

  const getUserConfig = (key: string) =>
    key && JSON.parse(localStorage.getItem(key) as string);

  return (
    <IssuesContext.Provider
      value={{
        repo,
        issues,
        loading,
        setLoading,
        saveUserConfig,
        getUserConfig,
        fetchRepo,
        fetchIssues,
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
};
