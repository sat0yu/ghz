import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  queryBrowserOperations,
  queryBrowserSelectors,
} from '../../state/queryBrowser';
import { Direction } from '../../state/queryBrowser/actions';
import { RootState } from '../../state/store';
import Feed from '../components/Feed';
import { TabContent, TabSelector, TabView } from '../components/TabView';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

const mapStateToProps = (store: RootState) => ({
  feedByQuery: queryBrowserSelectors.getFeedByQuery(store),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      searchRequest: queryBrowserOperations.searchRequest,
      discardQuery: queryBrowserOperations.discardQuery,
    },
    dispatch,
  );

class CardBoard extends React.Component<Props> {
  public render() {
    const { feedByQuery, searchRequest, discardQuery } = this.props;
    const tabList = Object.keys(feedByQuery).reduce((acc, key) => {
      const feed = feedByQuery[key];
      const { pageInfo, query } = feed;
      const handleReload = () => searchRequest({ pageInfo, query });
      const handleLoadNewerUpdates = () =>
        searchRequest({ pageInfo, query, direction: Direction.BEFORE });
      const handleLoadOlderUpdates = () =>
        searchRequest({ pageInfo, query, direction: Direction.AFTER });
      const handleDiscard = () => discardQuery({ query });
      return {
        ...acc,
        [key]: (
          <TabContent key={key} tabId={key}>
            <Feed
              key={query}
              feed={feed}
              handleReload={handleReload}
              handleLoadNewerUpdates={handleLoadNewerUpdates}
              handleLoadOlderUpdates={handleLoadOlderUpdates}
              handleDiscard={handleDiscard}
            />
          </TabContent>
        ),
      };
    }, {});

    return (
      <TabView>
        <ul>
          {Object.keys(tabList).map(key => (
            <li key={key}>
              <TabSelector tabId={key}>{key}</TabSelector>
            </li>
          ))}
        </ul>
        {Object.values(tabList)}
      </TabView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardBoard);
