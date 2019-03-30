import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { queryBrowserOperations } from '../../state/queryBrowser';
import { Direction } from '../../state/queryBrowser/actions';
import Feed from '../components/Feed';
import withFeedManager, {
  InjectedFeedManagerProps,
} from '../composers/FeedManager';

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = InjectedFeedManagerProps & DispatchProps;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      discardQuery: queryBrowserOperations.discardQuery,
      setActiveQuery: queryBrowserOperations.setActiveQuery,
    },
    dispatch,
  );

class CardBoard extends React.Component<Props> {
  public render() {
    const {
      feedByQuery,
      searchRequest,
      discardQuery,
      setActiveQuery,
    } = this.props;
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
          <Feed
            key={query}
            feed={feed}
            handleReload={handleReload}
            handleLoadNewerUpdates={handleLoadNewerUpdates}
            handleLoadOlderUpdates={handleLoadOlderUpdates}
            handleDiscard={handleDiscard}
          />
        ),
      };
    }, {});
    const tabSelectorList = Object.values(feedByQuery).map(feed => (
      <li
        key={feed.query}
        onClick={() => setActiveQuery({ query: feed.query })}
      >
        {feed.isActive ? `** ${feed.query} **` : feed.query}
      </li>
    ));

    return (
      <>
        <ul>{tabSelectorList}</ul>
        {Object.values(tabList)}
      </>
    );
  }
}

export default connect(
  undefined,
  mapDispatchToProps,
)(withFeedManager(CardBoard));
