import { isUndefined, omit, uniqBy } from 'lodash-es';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Feed } from '../../interfaces/card';
import {
  discardQuery,
  isFetchAfterRequest,
  isFetchBeforeRequest,
  search,
} from './actions';

type QueryBrowserState = Record<string, Feed>;

export const initialState = {};

export const reducers = reducerWithInitialState<QueryBrowserState>(initialState)
  .case(search.started, (state, { query, pageInfo }) => {
    const currentFeed = state[query];
    // currentFeed should be `undefiend` when the query is thrown for the first time
    const { cards = [], isActive = false } = currentFeed || {};
    return {
      ...state,
      [query]: {
        query,
        pageInfo,
        cards,
        isActive,
        error: undefined,
        isFeatching: true,
      },
    };
  })
  .case(search.failed, (state, { params, error }) => {
    const { query, pageInfo } = params;
    const currentFeed = state[query];
    // currentFeed should NOT be `undefiend`
    // because it is supposed to be populated in search.started
    const { cards = [], isActive = false } = currentFeed || {};
    return {
      ...state,
      [query]: {
        error,
        query,
        pageInfo,
        cards,
        isActive,
        isFeatching: false,
      },
    };
  })
  .case(search.done, (state, { params, result }) => {
    const { query } = params;
    const { pageInfo } = result;
    const {
      pageInfo: currentPageInfo,
      cards: currentCards,
      isActive: currentIsActive,
    } = state[query];
    const nextPageInfo = isUndefined(currentPageInfo)
      ? pageInfo
      : isFetchBeforeRequest(params)
      ? {
          // since loaded newer updates,
          // do not touch the page information about the succeedings
          endCursor: currentPageInfo.endCursor,
          hasNextPage: currentPageInfo.hasNextPage,
          hasPreviousPage:
            pageInfo.hasPreviousPage || currentPageInfo.hasPreviousPage,
          startCursor: pageInfo.startCursor || currentPageInfo.startCursor,
        }
      : isFetchAfterRequest(params)
      ? {
          endCursor: pageInfo.endCursor || currentPageInfo.endCursor,
          hasNextPage: pageInfo.hasNextPage || currentPageInfo.hasNextPage,
          // since loaded older updates,
          // do not touch the page information about the precedings
          hasPreviousPage: currentPageInfo.hasPreviousPage,
          startCursor: currentPageInfo.startCursor,
        }
      : // this line is just for a fallback, basically never reach here
        pageInfo;
    const fetchedCards = result.edges.map(edge => edge.node);
    const nextCards = isFetchBeforeRequest(params)
      ? uniqBy([...fetchedCards, ...currentCards], 'id')
      : isFetchAfterRequest(params)
      ? uniqBy([...currentCards, ...fetchedCards], 'id')
      : fetchedCards;
    return {
      ...state,
      [query]: {
        query,
        isActive: currentIsActive,
        isFeatching: false,
        error: undefined,
        pageInfo: nextPageInfo,
        cards: nextCards,
      },
    };
  })
  .case(discardQuery, (state, payload) => omit(state, payload.query));
