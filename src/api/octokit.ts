import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";

type Payload = {
  owner: any;
  repo: any;
};

export const instance = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN,
});

export const getRepo = async ({
  owner,
  repo,
}: Payload): Promise<OctokitResponse<any, number>> => {
  try {
    const response = await instance.request(`GET /repos/${owner}/${repo}`, {
      owner,
      repo,
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};

export const getRepoIssues = async ({
  owner,
  repo,
}: Payload): Promise<OctokitResponse<any, number>> => {
  try {
    const response = await instance.request(
      `GET /repos/${owner}/${repo}/issues`,
      {
        owner,
        repo,
      },
    );

    return response;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};
