import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import types from './types';

export const postQueryRequest = bindThunkAction(
  types.postQuery,
  async ({ query }, _dispatch) => {
    // tslint:disable-next-line:no-console
    console.log(query);
    await new Promise(resolve => setTimeout(resolve, 3000));
    return { query };
  },
);

export default { postQueryRequest };
