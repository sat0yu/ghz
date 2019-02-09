import { createSelector } from 'reselect';
import { RootState } from '../store';

const getQueryBrowserFromStore = (store: RootState) => store.queryBrowser;

const getIsPostingQuery = createSelector(
  getQueryBrowserFromStore,
  queryBrowser => queryBrowser.isPostingQuery,
);

export default {
  getIsPostingQuery,
};
