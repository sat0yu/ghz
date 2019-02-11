import { createSelector } from 'reselect';
import { RootState } from '../store';

const getQueryBrowserFromStore = (store: RootState) => store.queryBrowser;

const getIsPostingQuery = createSelector(
  getQueryBrowserFromStore,
  queryBrowser => queryBrowser.isPostingQuery,
);

const getCards = createSelector(
  getQueryBrowserFromStore,
  queryBrowser => queryBrowser.cards,
);

export default {
  getIsPostingQuery,
  getCards,
};
