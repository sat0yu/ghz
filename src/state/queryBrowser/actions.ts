import { isUndefined } from 'lodash-es';
import { actionCreatorFactory } from 'typescript-fsa';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import GithubApi from '../../helpers/GithubApi';
import { SearchQuery } from '../../interfaces/card';
import { ApiError, SearchResult } from '../../interfaces/GithubAPI';
import { types } from './types';

const actionCreator = actionCreatorFactory();

interface SearchParams extends SearchQuery {
  direction?: Direction;
}

export enum Direction {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

const buildSearchQuery = ({ query, pageInfo, direction }: SearchParams) => {
  const RESULT_PER_PAGE = 50;
  const safeQuery = query.replace(/"/g, '\\"');
  const base = `query: "${safeQuery}", type: ISSUE`;
  const option =
    isUndefined(pageInfo) || isUndefined(direction)
      ? `${base}, first: ${RESULT_PER_PAGE}`
      : direction === Direction.BEFORE
      ? `${base}, before: "${pageInfo.startCursor}", last: ${RESULT_PER_PAGE}`
      : `${base}, after: "${pageInfo.endCursor}", first: ${RESULT_PER_PAGE}`;
  return `
    query {
      search(${option}){
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          node {
            ...on Issue {
              ...comment
              title
              closed
              id
              url
            }
            ... on PullRequest {
              ...comment
              title
              closed
              id
              url
            }
          }
        }
      }
    }
    fragment actor on Actor {
      avatarUrl
      login
      url
    }
    fragment comment on Comment {
      author {
        ...actor
      }
      updatedAt
      createdAt
    }
  `;
};

export const search = actionCreator.async<SearchParams, SearchResult, ApiError>(
  types.POST_QUERY,
);

const searchRequest = bindThunkAction(search, async (params, _dispatch) => {
  const gql = buildSearchQuery(params);
  const res = await GithubApi.call(gql);
  const json = await res.json();
  if (json.errors) {
    throw new ApiError(json.errors);
  }
  return json.data.search;
});

interface DiscardQueryParams {
  query: string;
}

export const discardQuery = actionCreator<DiscardQueryParams>(
  types.DIDCARD_QUERY,
);

export default {
  searchRequest,
  discardQuery,
};
