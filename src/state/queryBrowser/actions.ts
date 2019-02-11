import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import GithubApi from '../../helpers/GithubApi';
import types from './types';

import { actionCreatorFactory } from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

interface PostQueryParams {
  query: string;
}
interface PostQueryPayload {
  json: string;
}

export const postQuery = actionCreator.async<
  PostQueryParams,
  PostQueryPayload,
  Error
>(types.POST_QUERY);

const postQueryRequest = bindThunkAction(
  postQuery,
  async ({ query }, _dispatch) => {
    const gql = `query {
      search(query: "${query}", first: 100, type: ISSUE){
        edges {
          cursor
          node {
            ...on Issue {
              url
            }
            ... on PullRequest {
              url
            }
          }
        }
      }
    }`;
    const res = await GithubApi.call(gql);
    const json = await res.json();
    return { json: JSON.stringify(json) };
  },
);

interface DiscardQueryParams {
  query: string;
}

export const discardQuery = actionCreator<DiscardQueryParams>(
  types.DIDCARD_QUERY,
);

export default { postQueryRequest, discardQuery };
