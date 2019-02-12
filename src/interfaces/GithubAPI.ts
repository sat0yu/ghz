import { Card } from './card';

export class ApiError extends Error {
  public readonly errors: GraphQLError[];

  public constructor(errors: GraphQLError[]) {
    super(JSON.stringify(errors));
    this.errors = errors;
  }
}

interface GraphQLError {
  message: string;
  locations: Location[];
}

interface Location {
  column: number;
  line: number;
}

export interface SearchResult {
  pageInfo: PageInfo;
  edges: Edge[];
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface Edge {
  cursor: string;
  node: Card;
}
