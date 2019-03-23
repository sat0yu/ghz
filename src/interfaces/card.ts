import { ApiError, PageInfo } from './GithubAPI';

export type FeedIndexByQuery = Record<string, Feed>;

export interface SearchQuery {
  pageInfo?: PageInfo;
  query: string;
}

export interface Status {
  isFeatching: boolean;
  error?: ApiError;
}

export interface Feed extends SearchQuery, Status {
  cards: Card[];
}

export type CardsIndexByQuery = Record<string, Card[]>;

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
