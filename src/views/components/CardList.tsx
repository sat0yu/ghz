import { Button } from '@material-ui/core';
import * as React from 'react';

interface SearchQuery {
  query: string;
  result: string;
  isFeatching: boolean;
}

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
    <p>{props.searchQuery.result}</p>
  </div>
);

export default CardList;
