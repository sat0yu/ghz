import { omit } from 'lodash-es';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ApiError, SearchResult } from '../../interfaces/GithubAPI';
import { discardQuery, search } from './actions';

export interface SearchQuery {
  query: string;
  result?: SearchResult;
  isFeatching: boolean;
  error: ApiError;
}

interface QueryBrowserState {
  [query: string]: SearchQuery;
}

export const initialState = {};

export const reducers = reducerWithInitialState<QueryBrowserState>(initialState)
  .case(search.started, (state, payload) => ({
    ...state,
    [payload.query]: {
      ...(state[payload.query] || {}),
      isFeatching: true,
    },
  }))
  .case(search.failed, (state, payload) => ({
    ...state,
    [payload.params.query]: {
      ...(state[payload.params.query] || {}),
      isFeatching: false,
      error: payload.error,
    },
  }))
  .case(search.done, (state, payload) => ({
    ...state,
    [payload.params.query]: {
      ...(state[payload.params.query] || {}),
      isFeatching: false,
      result: payload.result,
    },
  }))
  .case(discardQuery, (state, payload) => omit(state, payload.query));
