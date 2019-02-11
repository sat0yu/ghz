import { actionCreatorFactory } from 'typescript-fsa';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import GithubApi from '../../helpers/GithubApi';
import { Card } from '../../interfaces/card';
import { GithubApiError } from '../../interfaces/errors';
import types from './types';

const actionCreator = actionCreatorFactory();

interface PostQueryParams {
  query: string;
}
interface PostQueryResult {
  cards: Card[];
}

export const postQuery = actionCreator.async<
  PostQueryParams,
  PostQueryResult,
  GithubApiError
>(types.POST_QUERY);

const postQueryRequest = bindThunkAction(
  postQuery,
  async ({ query }, _dispatch) => {
    const safeQuery = query.replace(/"/g, '\\"');
    const gql = `
      query {
        search(query: "${safeQuery}", first: 100, type: ISSUE){
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
    const res = await GithubApi.call(gql);
    const json = await res.json();
    if (json.errors) {
      throw new GithubApiError(json.errors);
    }
    const cards = json.data.search.edges.map(
      (edge: { node: Card }) => edge.node,
    );
    return { cards };
  },
);

interface DiscardQueryParams {
  query: string;
}

export const discardQuery = actionCreator<DiscardQueryParams>(
  types.DIDCARD_QUERY,
);

export default { postQueryRequest, discardQuery };
