import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  queryBrowserOperations,
  queryBrowserSelectors,
} from '../../state/queryBrowser';
import { RootState } from '../../state/store';
import QueryForm from '../components/QueryForm';

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
type Props = StateProps & DispatchProps;

interface State {
  queries: string[];
}

const mapStateToProps = (store: RootState) => ({
  isPostingQuery: queryBrowserSelectors.getIsPostingQuery(store),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postQueryRequest: queryBrowserOperations.postQueryRequest,
    },
    dispatch,
  );

class CardBrowser extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { queries: [] };
    this.registerQuery = this.registerQuery.bind(this);
  }

  public render() {
    return (
      <div>
        <p>{this.props.isPostingQuery ? 'true' : 'false'}</p>
        <QueryForm onSubmit={this.registerQuery} />
        {this.state.queries.map(q => (
          <p onClick={() => this.props.postQueryRequest({ query: q })}>{q}</p>
        ))}
      </div>
    );
  }

  private registerQuery(query: string) {
    this.setState({ queries: [...this.state.queries, query] });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardBrowser);
