/* eslint-disable */
import axios from 'axios';

export interface GithubApiResponse {
  incomplete_results: boolean;
  total_count: number;
  items: GithubRepo[];
}

export interface GithubRepo {
  clone_url: string;
  html_url: string;
  git_url: string;
  description: string;
  issues_url: string;
  created_at: string;
  archived: boolean;
  disabled: boolean;
  forks_count: number;
  open_issues: unknown;
  open_issues_count: number;
  name: string;
  id: number;
  license: GithubLicense;
  owner: GithubRepoOwner;
  watchers_count: number;
  stargazers_count: number;
}

interface GithubLicense {
  key: string;
  name: string;
}

interface GithubRepoOwner {
  avatar_url: string;
  login: string;
  repos_url: string;
  url: string;
  id: number;
}

interface GithubSearchOptions {
  username: string | null;
  topic: string | null;
  page: number;
  perPage: number;
}

interface GithubError {
  error: string;
}

const githubOptions = {
  baseURL: 'https://api.github.com',
  headers: {
    accept: 'application/vnd.github.v3+json',
  },
};

async function getRepos(options: GithubSearchOptions): Promise<GithubApiResponse | GithubError> {
  try {
    let queries = [];

    if (options.username) {
      queries.push(`user:${options.username}`);
    }

    if (options.topic) {
      queries.push(`topic:${options.topic}`);
    }

    const response = await axios.get<GithubApiResponse>(`/search/repositories?q=${queries.join('+')}&sort=stars&order=desc&per_page=${options.perPage}&page=${options.page}`, githubOptions);

    return response.data;
  } catch (error) {
    console.error('GITHUB_API_ERROR:', error);

    return {
      error: error.message,
    };
  }
}

export default { getRepos };
