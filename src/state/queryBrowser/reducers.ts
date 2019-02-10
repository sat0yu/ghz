import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { postQuery } from './actions';

interface State {
  isPostingQuery: boolean;
}

export const initialState = {
  isPostingQuery: false,
};

export const reducers = reducerWithInitialState<State>(initialState)
  .case(postQuery.started, state => ({
    ...state,
    isPostingQuery: true,
  }))
  .cases([postQuery.failed, postQuery.done], state => ({
    ...state,
    isPostingQuery: false,
  }));
