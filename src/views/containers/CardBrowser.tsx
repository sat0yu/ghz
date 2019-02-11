import { omit } from 'lodash-es';
import * as React from 'react';
import { connect } from 'react-redux';
import { queryBrowserSelectors } from '../../state/queryBrowser';
import { RootState } from '../../state/store';
import QueryForm from '../components/QueryForm';
import CardList from './CardList';

type StateProps = ReturnType<typeof mapStateToProps>;
type Props = StateProps;

interface QueryMap {
  [query: string]: boolean;
}

interface State {
  queries: QueryMap;
}

const mapStateToProps = (store: RootState) => ({
  isPostingQuery: queryBrowserSelectors.getIsPostingQuery(store),
});

class CardBrowser extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { queries: {} };
    this.discardResult = this.discardResult.bind(this);
    this.registerQuery = this.registerQuery.bind(this);
  }

  public render() {
    return (
      <div>
        <p>{this.props.isPostingQuery ? 'true' : 'false'}</p>
        <QueryForm onSubmit={this.registerQuery} />
        {Object.keys(this.state.queries).map((q, index) => (
          <CardList
            key={index}
            query={q}
            onDestroy={() => this.discardResult(q)}
          />
        ))}
      </div>
    );
  }

  private discardResult(query: string) {
    this.setState({ queries: omit(this.state.queries, query) });
  }

  private registerQuery(query: string) {
    this.setState({
      queries: {
        ...this.state.queries,
        [query]: true,
      },
    });
  }
}

export default connect(mapStateToProps)(CardBrowser);
