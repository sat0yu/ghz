import { omit } from 'lodash-es';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Card } from '../../interfaces/card';
import { GithubApiError } from '../../interfaces/errors';
import { discardQuery, postQuery } from './actions';

export interface SearchQuery {
  query: string;
  result: Card[];
  isFeatching: boolean;
  error: GithubApiError;
}

interface SearchQueryMap {
  [query: string]: SearchQuery;
}

interface State {
  searchQueryMap: SearchQueryMap;
}

export const initialState = {
  searchQueryMap: {},
};

export const reducers = reducerWithInitialState<State>(initialState)
  .case(postQuery.started, (state, payload) => ({
    ...state,
    searchQueryMap: {
      ...state.searchQueryMap,
      [payload.query]: {
        ...(state.searchQueryMap[payload.query] || {}),
        isFeatching: true,
        result: [],
      },
    },
  }))
  .case(postQuery.failed, (state, payload) => ({
    ...state,
    searchQueryMap: {
      ...state.searchQueryMap,
      [payload.params.query]: {
        ...(state.searchQueryMap[payload.params.query] || {}),
        isFeatching: false,
        error: payload.error,
      },
    },
  }))
  .case(postQuery.done, (state, payload) => ({
    ...state,
    searchQueryMap: {
      ...state.searchQueryMap,
      [payload.params.query]: {
        ...(state.searchQueryMap[payload.params.query] || {}),
        isFeatching: false,
        result: payload.result.cards,
      },
    },
  }))
  .case(discardQuery, (state, payload) => ({
    ...state,
    searchQueryMap: omit(state.searchQueryMap, payload.query),
  }));
