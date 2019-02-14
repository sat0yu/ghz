import { isUndefined, omit } from 'lodash-es';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { SearchQuery, Status } from '../../interfaces/card';
import { Direction, discardQuery, search } from './actions';

interface FeedState extends SearchQuery, Status {}

interface QueryBrowserState {
  [query: string]: FeedState;
}

export const initialState = {};

export const reducers = reducerWithInitialState<QueryBrowserState>(initialState)
  .case(search.started, (state, { query, pageInfo }) => {
    const result = (state[query] || {}).result;
    return {
      ...state,
      [query]: {
        query,
        pageInfo,
        result,
        isFeatching: true,
        error: undefined,
      },
    };
  })
  .case(search.failed, (state, { params, error }) => {
    const { query, pageInfo } = params;
    const {
      query: currentQuery,
      pageInfo: currentPageInfo,
      result: currentResult,
    } = state[query];
    return {
      ...state,
      [query]: {
        error,
        isFeatching: false,
        query: query || currentQuery,
        pageInfo: pageInfo || currentPageInfo,
        result: currentResult,
      },
    };
  })
  .case(search.done, (state, { params, result }) => {
    const { query, direction } = params;
    const { pageInfo, edges } = result;
    const { result: currentResult } = state[query];
    const nextEdges =
      isUndefined(currentResult) || isUndefined(direction)
        ? result.edges
        : direction === Direction.BEFORE
        ? [...edges, ...currentResult.edges]
        : [...currentResult.edges, ...edges];
    return {
      ...state,
      [query]: {
        query,
        pageInfo,
        isFeatching: false,
        error: undefined,
        result: {
          pageInfo,
          edges: nextEdges,
        },
      },
    };
  })
  .case(discardQuery, (state, payload) => omit(state, payload.query));
