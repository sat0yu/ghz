import * as React from 'react';
import QueryForm from '../components/QueryForm';

// tslint:disable-next-line:no-empty-interface
interface Props {}

interface State {
  queries: string[];
}

export default class CardBrowser extends React.Component<Props, State> {
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
          <p>{q}</p>
        ))}
      </div>
    );
  }

  private registerQuery(query: string) {
    this.setState({ queries: [...this.state.queries, query] });
  }
}
