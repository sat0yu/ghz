import { ApiError, PageInfo } from './GithubAPI';

export interface Feed {
  pageInfo: PageInfo;
  query: string;
  cards: Card[];
  isFeatching: boolean;
  error: ApiError;
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
