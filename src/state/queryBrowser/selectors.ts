import { isUndefined } from 'lodash-es';
import { createSelector } from 'reselect';
import { Card, Feed } from '../../interfaces/card';
import { RootState } from '../store';

const getQueryBrowserFromStore = (store: RootState) => store.queryBrowser;

const getCardsByQuery = createSelector(
  getQueryBrowserFromStore,
  queryBrowser =>
    Object.keys(queryBrowser).reduce(
      (acc: { [query: string]: Card[] }, query) => {
        const { result } = queryBrowser[query];
        return isUndefined(result)
          ? acc
          : {
              ...acc,
              [query]: result.edges.map(edge => edge.node),
            };
      },
      {},
    ),
);

const getFeedByQuery = createSelector(
  getQueryBrowserFromStore,
  getCardsByQuery,
  (queryBrowser, cardsByQuery) =>
    Object.keys(queryBrowser).reduce(
      (acc: { [query: string]: Feed }, query) => {
        const { result, isFeatching, error } = queryBrowser[query];
        return isUndefined(result)
          ? acc
          : {
              ...acc,
              [query]: {
                error,
                isFeatching,
                cards: cardsByQuery[query],
                pageInfo: result.pageInfo,
              },
            };
      },
      {},
    ),
);

export default {
  getFeedByQuery,
  getCardsByQuery,
};
