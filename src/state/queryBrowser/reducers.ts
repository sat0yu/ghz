import { omit } from 'lodash-es';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { SearchQuery, Status } from '../../interfaces/card';
import { discardQuery, search } from './actions';

interface FeedState extends SearchQuery, Status {}

interface QueryBrowserState {
  [query: string]: FeedState;
}

export const initialState = {};

export const reducers = reducerWithInitialState<QueryBrowserState>(initialState)
  .case(search.started, (state, { query, pageInfo }) => ({
    ...state,
    [query]: {
      query,
      pageInfo,
      isFeatching: true,
      error: undefined,
    },
  }))
  .case(search.failed, (state, { params, error }) => ({
    ...state,
    [params.query]: {
      error,
      ...params,
      isFeatching: false,
    },
  }))
  .case(search.done, (state, { params, result }) => ({
    ...state,
    [params.query]: {
      result,
      ...params,
      isFeatching: false,
      error: undefined,
    },
  }))
  .case(discardQuery, (state, payload) => omit(state, payload.query));
