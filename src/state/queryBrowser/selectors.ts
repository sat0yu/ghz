import { createSelector } from 'reselect';
import { RootState } from '../store';

const getQueryBrowserFromStore = (store: RootState) => store.queryBrowser;

const getFeedByQuery = createSelector(
  getQueryBrowserFromStore,
  queryBrowser => queryBrowser,
);

export default {
  getFeedByQuery,
};
