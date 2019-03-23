import { isUndefined, omit, uniqBy } from 'lodash-es';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Feed } from '../../interfaces/card';
import { Direction, discardQuery, search } from './actions';

type QueryBrowserState = Record<string, Feed>;

export const initialState = {};

export const reducers = reducerWithInitialState<QueryBrowserState>(initialState)
  .case(search.started, (state, { query, pageInfo }) => {
    const currentFeed = state[query];
    return {
      ...state,
      [query]: {
        query,
        pageInfo,
        // currentFeed should be `undefiend` when the query is thrown for the first time
        cards: (currentFeed && currentFeed.cards) || [],
        error: undefined,
        isFeatching: true,
      },
    };
  })
  .case(search.failed, (state, { params, error }) => {
    const { query, pageInfo } = params;
    const currentFeed = state[query];
    return {
      ...state,
      [query]: {
        error,
        query,
        pageInfo,
        // currentFeed should NOT be `undefiend`
        // because it is supposed to be populated in search.started
        cards: (currentFeed && currentFeed.cards) || [],
        isFeatching: false,
      },
    };
  })
  .case(search.done, (state, { params, result }) => {
    const { query, direction } = params;
    const { pageInfo } = result;
    const { pageInfo: currentPageInfo, cards: currentCards } = state[query];
    const nextPageInfo =
      isUndefined(currentPageInfo) || isUndefined(direction)
        ? pageInfo
        : direction === Direction.BEFORE
        ? {
            // since loaded newer updates,
            // do not touch the page information about the succeedings
            endCursor: currentPageInfo.endCursor,
            hasNextPage: currentPageInfo.hasNextPage,
            hasPreviousPage:
              pageInfo.hasPreviousPage || currentPageInfo.hasPreviousPage,
            startCursor: pageInfo.startCursor || currentPageInfo.startCursor,
          }
        : {
            endCursor: pageInfo.endCursor || currentPageInfo.endCursor,
            hasNextPage: pageInfo.hasNextPage || currentPageInfo.hasNextPage,
            // since loaded older updates,
            // do not touch the page information about the precedings
            hasPreviousPage: currentPageInfo.hasPreviousPage,
            startCursor: currentPageInfo.startCursor,
          };
    const fetchedCards = result.edges.map(edge => edge.node);
    const nextCards = isUndefined(direction)
      ? fetchedCards
      : direction === Direction.BEFORE
      ? uniqBy([...fetchedCards, ...currentCards], 'id')
      : uniqBy([...currentCards, ...fetchedCards], 'id');
    return {
      ...state,
      [query]: {
        query,
        isFeatching: false,
        error: undefined,
        pageInfo: nextPageInfo,
        cards: nextCards,
      },
    };
  })
  .case(discardQuery, (state, payload) => omit(state, payload.query));
