import { createSelector } from 'reselect';
import { RootState } from '../store';

const getQueryBrowserFromStore = (store: RootState) => store.queryBrowser;

const getSearchQueryMap = createSelector(
  getQueryBrowserFromStore,
  queryBrowser => queryBrowser.searchQueryMap,
);

export default {
  getSearchQueryMap,
};
