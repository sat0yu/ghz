import * as React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import {
  Card as CardInterface,
  Feed as FeedInterface,
} from '../../interfaces/card';

interface Props {
  feed: FeedInterface;
  handleReload: () => void;
  handleLoadNewerUpdates: () => void;
  handleLoadOlderUpdates: () => void;
  handleDiscard: () => void;
}

const renderListItem: ListRenderItem<CardInterface> = ({ item }) => (
  <ListItem
    title={item.title}
    subtitle={item.updatedAt}
    leftAvatar={{ source: { uri: item.author.avatarUrl } }}
  />
);

const Feed: React.FC<Props> = props => (
  <View>
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
    <p>{props.feed.cards.length}</p>
    <FlatList data={props.feed.cards} renderItem={renderListItem} />
  </View>
);

export default Feed;
