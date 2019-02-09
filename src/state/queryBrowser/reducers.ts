import { reducerWithInitialState } from 'typescript-fsa-reducers';
import types from './types';

interface State {
  isPostingQuery: boolean;
}

export const initialState = {
  isPostingQuery: false,
};

export const reducers = reducerWithInitialState<State>(initialState)
  .case(types.postQuery.started, state => ({
    ...state,
    isPostingQuery: true,
  }))
  .cases([types.postQuery.failed, types.postQuery.failed], state => ({
    ...state,
    isPostingQuery: false,
  }));
