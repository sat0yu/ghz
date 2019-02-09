import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { queryBrowserOperations } from '../../state/queryBrowser';
import QueryForm from '../components/QueryForm';

type Props = ReturnType<typeof mapDispatchToProps>;

interface State {
  queries: string[];
}

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
        <QueryForm onSubmit={this.registerQuery} />
        {this.state.queries.map(q => (
          <p onClick={() => this.props.postQueryRequest({ query: q }) && true}>
            {q}
          </p>
        ))}
      </div>
    );
  }

  private registerQuery(query: string) {
    this.setState({ queries: [...this.state.queries, query] });
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(CardBrowser);
