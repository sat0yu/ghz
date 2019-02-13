import { actionCreatorFactory } from 'typescript-fsa';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import GithubApi from '../../helpers/GithubApi';
import { Feed } from '../../interfaces/card';
import { ApiError, SearchResult } from '../../interfaces/GithubAPI';
import { types } from './types';

const actionCreator = actionCreatorFactory();

type PartialFeed = Partial<Feed> & { query: string };

const buildSearchParams = (feed: PartialFeed) => {
  const { query } = feed;
  const safeQuery = query.replace(/"/g, '\\"');
  return `query: "${safeQuery}", first: 100, type: ISSUE`;
};

const buildSearchQuery = (feed: PartialFeed) => {
  const params = buildSearchParams(feed);
  return `
    query {
      search(${params}){
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

interface SearchParams {
  query: string;
}

export const search = actionCreator.async<SearchParams, SearchResult, ApiError>(
  types.POST_QUERY,
);

const searchRequest = bindThunkAction(search, async ({ query }, _dispatch) => {
  const gql = buildSearchQuery({ query });
  const res = await GithubApi.call(gql);
  const json = await res.json();
  if (json.errors) {
    throw new ApiError(json.errors);
  }
  return json.data.search;
});

interface LoadMoreParams {
  feed: Feed;
}

type LoadMoreResult = SearchResult;

export const loadMore = actionCreator.async<
  LoadMoreParams,
  LoadMoreResult,
  ApiError
>(types.LOAD_MORE_QUERY);

const loadMoreRequest = bindThunkAction(
  loadMore,
  async ({ feed }, _dispatch) => {
    const gql = buildSearchQuery(feed);
    const res = await GithubApi.call(gql);
    const json = await res.json();
    if (json.errors) {
      throw new ApiError(json.errors);
    }
    return json.data.search;
  },
);

interface DiscardQueryParams {
  query: string;
}

export const discardQuery = actionCreator<DiscardQueryParams>(
  types.DIDCARD_QUERY,
);

export default { searchRequest, discardQuery, loadMoreRequest };
