import { ApiError, PageInfo, SearchResult } from './GithubAPI';

export interface FeedIndexByQuery {
  [query: string]: Feed;
}

export interface SearchQuery {
  pageInfo?: PageInfo;
  query: string;
}

export interface Status {
  isFeatching: boolean;
  error?: ApiError;
  result?: SearchResult;
}

export interface Feed extends SearchQuery, Status {
  cards: Card[];
}

export interface CardsIndexByQuery {
  [query: string]: Card[];
}

export interface Card {
  author: Actor;
  closed: boolean;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  url: string;
}

interface Actor {
  avatarUrl: string;
  login: string;
  url: string;
}
