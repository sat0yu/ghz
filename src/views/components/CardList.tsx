import { Button } from '@material-ui/core';
import * as React from 'react';
import { SearchQuery } from '../../state/queryBrowser/reducers';
import Card from './Card';

interface Props {
  searchQuery: SearchQuery;
  handleReload: () => void;
  handleDiscard: () => void;
}

const CardList: React.FC<Props> = props => (
  <div>
    <Button onClick={props.handleReload}>
      <p>reload</p>
    </Button>
    <Button onClick={props.handleDiscard}>
      <p>discard</p>
    </Button>
    <p>{`${props.searchQuery.query}: ${
      props.searchQuery.isFeatching ? 'loading' : 'done'
    }`}</p>
    <ul>
      {props.searchQuery.result.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </ul>
  </div>
);

export default CardList;
