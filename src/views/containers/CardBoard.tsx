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

class CardBrowser extends React.Component<Props> {
  public render() {
    const { feedByQuery, searchRequest, discardQuery } = this.props;
    return Object.keys(feedByQuery).map(query => {
      const feed = feedByQuery[query];
      const handleReload = () => searchRequest(feed);
      const handleLoadNewerUpdates = () =>
        searchRequest({ ...feed, direction: Direction.BEFORE });
      const handleLoadOlderUpdates = () =>
        searchRequest({ ...feed, direction: Direction.AFTER });
      const handleDiscard = () => discardQuery({ query });
      return (
        <Feed
          key={query}
          feed={feed}
          handleReload={handleReload}
          handleLoadNewerUpdates={handleLoadNewerUpdates}
          handleLoadOlderUpdates={handleLoadOlderUpdates}
          handleDiscard={handleDiscard}
        />
      );
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardBrowser);
