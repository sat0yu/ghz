import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import types from './types';

export const postQueryRequest = bindThunkAction(
  types.postQuery,
  async ({ query }, _dispatch) => {
    // tslint:disable-next-line:no-console
    console.log(query);
    return { query };
  },
);

export default { postQueryRequest };
