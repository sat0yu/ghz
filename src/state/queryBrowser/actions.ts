import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import GithubApi from '../../helpers/GithubApi';
import types from './types';

export const postQueryRequest = bindThunkAction(
  types.postQuery,
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
