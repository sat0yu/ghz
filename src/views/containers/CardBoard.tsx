import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  queryBrowserOperations,
  queryBrowserSelectors,
} from '../../state/queryBrowser';
import { RootState } from '../../state/store';
import CardList from '../components/CardList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

const mapStateToProps = (store: RootState) => ({
  searchQueryMap: queryBrowserSelectors.getSearchQueryMap(store),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postQueryRequest: queryBrowserOperations.postQueryRequest,
      discardQuery: queryBrowserOperations.discardQuery,
    },
    dispatch,
  );

class CardBrowser extends React.Component<Props> {
  public render() {
    const { searchQueryMap, postQueryRequest, discardQuery } = this.props;
    return Object.keys(searchQueryMap).map(query => {
      const searchQuery = searchQueryMap[query];
      const handleReload = () => postQueryRequest({ query });
      const handleDiscard = () => discardQuery({ query });
      return (
        <CardList
          key={query}
          searchQuery={searchQuery}
          handleReload={handleReload}
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
