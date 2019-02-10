import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import GithubApi from '../../helpers/GithubApi';
import types from './types';

import { actionCreatorFactory } from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

interface PostQueryParams {
  query: string;
}
interface PostQueryPayload {
  query: string;
}

export const postQuery = actionCreator.async<
  PostQueryParams,
  PostQueryPayload,
  Error
>(types.POST_QUERY);

const postQueryRequest = bindThunkAction(
  postQuery,
  async ({ query }, _dispatch) => {
    // tslint:disable-next-line:no-console
    console.log(query);
    const res = await GithubApi.call(query);
    // tslint:disable-next-line:no-console
    console.log(res);
    return { query };
  },
);

export default { postQueryRequest };
