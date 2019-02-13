import { Button } from '@material-ui/core';
import * as React from 'react';
import { Feed } from '../../interfaces/card';
import Card from './Card';

interface Props {
  feed: Feed;
  handleReload: () => void;
  handleDiscard: () => void;
}

const Feed: React.FC<Props> = props => (
  <div>
    <Button onClick={props.handleReload}>
      <p>reload</p>
    </Button>
    <Button onClick={props.handleDiscard}>
      <p>discard</p>
    </Button>
    <p>{`${props.feed.query}: ${
      props.feed.isFeatching ? 'loading' : 'done'
    }`}</p>
    <ul>
      {props.feed.cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </ul>
  </div>
);

export default Feed;
