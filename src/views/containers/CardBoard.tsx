import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { queryBrowserOperations } from '../../state/queryBrowser';
import { RootState } from '../../state/store';
import CardList from '../components/CardList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

const mapStateToProps = (store: RootState) => {
  searchQueries: getSearchQueries(store);
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postQueryRequest: queryBrowserOperations.postQueryRequest,
    },
    dispatch,
  );

class CardBrowser extends React.Component<Props> {
  public render() {
    const { searchQueries, postQueryRequest, discardQueryResult } = this.props;
    return Object.keys(searchQueries).map(query => {
      const searchQuery = searchQueries[query];
      const handleReload = () => postQueryRequest({ query });
      const handleDiscard = () => discardQueryResult({ query });
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

export default connect(mapStateToProps)(CardBrowser);
