import { isUndefined, omit, uniqBy } from 'lodash-es';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Feed, Card } from '../../interfaces/card';
import { Direction, discardQuery, search } from './actions';

interface QueryBrowserState {
  [query: string]: Feed;
}

type Feedable = Pick<Feed, 'result'>;

const extractCards = (feed: Feedable | undefined): Card[] =>
  !!feed && !!feed.result ? feed.result.edges.map(edge => edge.node) : [];

export const initialState = {};

export const reducers = reducerWithInitialState<QueryBrowserState>(initialState)
  .case(search.started, (state, { query, pageInfo }) => {
    return {
      ...state,
      [query]: {
        query,
        pageInfo,
        cards: extractCards(state[query]),
        error: undefined,
        isFeatching: true,
      },
    };
  })
  .case(search.failed, (state, { params, error }) => {
    const { query, pageInfo } = params;
    return {
      ...state,
      [query]: {
        error,
        query,
        pageInfo,
        cards: extractCards(state[query]),
        isFeatching: false,
      },
    };
  })
  .case(search.done, (state, { params, result }) => {
    const { query, direction } = params;
    const { pageInfo } = result;
    const {
      result: currentResult,
      pageInfo: currentPageInfo,
      cards: currentCards,
    } = state[query];
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
    const fetchedCards = extractCards({ result });
    const nextCards =
      isUndefined(currentResult) || isUndefined(direction)
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
