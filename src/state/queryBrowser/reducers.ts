import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { postQuery } from './actions';

interface State {
  isPostingQuery: boolean;
  cards: string;
}

export const initialState = {
  isPostingQuery: false,
  cards: '',
};

export const reducers = reducerWithInitialState<State>(initialState)
  .case(postQuery.started, state => ({
    ...state,
    isPostingQuery: true,
  }))
  .case(postQuery.failed, state => ({
    ...state,
    isPostingQuery: false,
  }))
  .case(postQuery.done, (state, payload) => ({
    ...state,
    cards: payload.result.json,
    isPostingQuery: false,
  }));
