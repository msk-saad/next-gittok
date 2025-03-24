import { Repository } from '../components/content/RepoCard';
import {
  InvalidTokenError,
  OnlyFirst1000ResultsError,
  RateLimitExceededError,
} from './error';

const GITHUB_BASE_API = 'https://api.github.com';

export interface SearchResponse {
  total_count: number;
  items: Repository[];
}

export type SearchCriteria = {
  stars: string;
  language?: string;
  created?: string;
};

export type FeedType = 'random' | 'new';

export const PER_PAGE = 10;
export const MAX_PAGES = 100; // 1000 results limited to 10 per page

//Search criteria in 2000, [2000...4000, 4000. 6000];

export const getSearchCriterias = (feedType: FeedType): SearchCriteria[] => {
  if (feedType === 'new') {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const formattedDate = date.toISOString().split('T')[0];
    return [{ stars: '>10', created: `>${formattedDate}` }];
  }

  const criterias: SearchCriteria[] = [];
  criterias.push({ stars: '700...2000' });

  for (let i = 2000; i < 50000; i += 2000) {
    criterias.push({
      stars: `${i}...${i + 2000}`,
    });
  }

  criterias.push({ stars: '>50000' });
  return criterias;
};

function searchQuery(criteria: SearchCriteria) : string{
  const parts = [`stars:${criteria.stars}`];

  if (criteria.language) {
    parts.push(`language:${criteria.language}`);
  }

  if (criteria.created) {
    parts.push(`created:${criteria.created}`);
  }

  return parts.join(' ');
}

export interface FetchRepoOptions {
  criteria: SearchCriteria;
  page: number;
}

export async function fetchRepoPage(
  {criteria, page}: FetchRepoOptions,
  token?: string,
): Promise<SearchResponse> {
  if (page > MAX_PAGES) {
    throw new Error('Only first 1000 results are available');
  }

  const query = searchQuery(criteria);
  const isNewFeed = criteria.created !== undefined;
  const sort = isNewFeed ? 'created' : 'stars';
  const url = `${GITHUB_BASE_API}/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=desc&page=${page}&per_page=${PER_PAGE}`;

  const response = await fetch(url, token ? {headers: {Authorization: `token ${token}`}} : undefined);
  // const data: SearchResponse = await response.json();
  // return data;

  if (!response.ok) {
    if (response.status === 403) {
      throw new RateLimitExceededError(
        'Rate limit exceeded. Please try again later.'
      );
    }

    if (response.status === 422) {
      throw new OnlyFirst1000ResultsError(
        'Only first 1000 search results are available'
      );
    }

    if (response.status === 401) {
      throw new InvalidTokenError(
        'Invalid token, please check your GitHub token and try again.'
      );
    }

    throw new Error('Failed to fetch repositories');
  }
  return response.json();
}