import { Button } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  queryBrowserOperations,
  queryBrowserSelectors,
} from '../../state/queryBrowser';
import { RootState } from '../../state/store';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = OwnProps & StateProps & DispatchProps;

interface OwnProps {
  query: string;
  onDestroy: () => void;
}

const mapStateToProps = (store: RootState) => ({
  isPostingQuery: queryBrowserSelectors.getIsPostingQuery(store),
  cards: queryBrowserSelectors.getCards(store),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postQueryRequest: queryBrowserOperations.postQueryRequest,
    },
    dispatch,
  );

class CardList extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    this.fetchCards = this.fetchCards.bind(this);
  }

  public render() {
    return (
      <div>
        <Button onClick={this.fetchCards}>
          <p>search</p>
        </Button>
        <Button onClick={this.props.onDestroy}>
          <p>discard</p>
        </Button>
        <p>{`${this.props.query}: ${
          this.props.isPostingQuery ? 'loading' : 'done'
        }`}</p>
        <p>{this.props.cards}</p>
      </div>
    );
  }

  private fetchCards() {
    this.props.postQueryRequest({ query: this.props.query });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
