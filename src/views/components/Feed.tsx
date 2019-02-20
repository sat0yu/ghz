import { Button } from 'react-native';
import * as React from 'react';
import { Feed as FeedInterface } from '../../interfaces/card';
import Card from './Card';

interface Props {
  feed: FeedInterface;
  handleReload: () => void;
  handleLoadNewerUpdates: () => void;
  handleLoadOlderUpdates: () => void;
  handleDiscard: () => void;
}

const Feed: React.FC<Props> = props => (
  <div>
    <Button title="reload" onPress={props.handleReload} />
    <Button
      title="load recent updates"
      onPress={props.handleLoadNewerUpdates}
    />
    <Button title="load older updates" onPress={props.handleLoadOlderUpdates} />
    <Button title="discard" onPress={props.handleDiscard} />
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
