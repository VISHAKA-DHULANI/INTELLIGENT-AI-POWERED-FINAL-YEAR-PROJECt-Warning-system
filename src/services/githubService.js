import { api } from "./api";

export async function saveGithubUrl(projectId, githubUrl) {
  return api.put(`/projects/${projectId}/github-url`, {
    github_url: githubUrl,
  });
}

export async function getGithubProjectData(projectId) {
  return api.get(`/github/project/${projectId}`);
}