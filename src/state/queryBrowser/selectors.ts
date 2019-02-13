import { isUndefined } from 'lodash-es';
import { createSelector } from 'reselect';
import { CardsIndexByQuery, FeedIndexByQuery } from '../../interfaces/card';
import { RootState } from '../store';

const getQueryBrowserFromStore = (store: RootState) => store.queryBrowser;

const getCardsByQuery = createSelector(
  getQueryBrowserFromStore,
  queryBrowser => {
    const initialValue: CardsIndexByQuery = {};
    return Object.keys(queryBrowser).reduce((acc: CardsIndexByQuery, query) => {
      const { result } = queryBrowser[query];
      return isUndefined(result)
        ? acc
        : {
            ...acc,
            [query]: result.edges.map(edge => edge.node),
          };
    }, initialValue);
  },
);

const getFeedByQuery = createSelector(
  getQueryBrowserFromStore,
  getCardsByQuery,
  (queryBrowser, cardsByQuery) => {
    const initialValue: FeedIndexByQuery = {};
    return Object.keys(queryBrowser).reduce((acc: FeedIndexByQuery, query) => {
      const { result, isFeatching, error } = queryBrowser[query];
      return isUndefined(result)
        ? acc
        : {
            ...acc,
            [query]: {
              query,
              error,
              isFeatching,
              cards: cardsByQuery[query],
              pageInfo: result.pageInfo,
            },
          };
    }, initialValue);
  },
);

export default {
  getFeedByQuery,
  getCardsByQuery,
};
