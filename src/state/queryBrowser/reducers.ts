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
    const { result: currentResult, pageInfo: currentPageInfo } = state[query];
    const nextPageInfo =
      isUndefined(currentPageInfo) || isUndefined(direction)
        ? pageInfo
        : direction === Direction.BEFORE
        ? {
            // since loaded newer updates,
            // do not touch the page information about the succeedings
            endCursor: pageInfo.endCursor,
            hasNextPage: pageInfo.hasNextPage,
            hasPreviousPage:
              pageInfo.hasPreviousPage || currentPageInfo.hasPreviousPage,
            startCursor: pageInfo.startCursor || currentPageInfo.startCursor,
          }
        : {
            endCursor: pageInfo.endCursor || currentPageInfo.endCursor,
            hasNextPage: pageInfo.hasNextPage || currentPageInfo.hasNextPage,
            // since loaded older updates,
            // do not touch the page information about the precedings
            hasPreviousPage: pageInfo.hasPreviousPage,
            startCursor: pageInfo.startCursor,
          };
    const nextEdges =
      isUndefined(currentResult) || isUndefined(direction)
        ? edges
        : direction === Direction.BEFORE
        ? [...edges, ...currentResult.edges]
        : [...currentResult.edges, ...edges];
    const nextResult = {
      pageInfo: nextPageInfo,
      edges: nextEdges,
    };
    return {
      ...state,
      [query]: {
        query,
        isFeatching: false,
        error: undefined,
        pageInfo: nextResult.pageInfo,
        result: nextResult,
      },
    };
  })
  .case(discardQuery, (state, payload) => omit(state, payload.query));
