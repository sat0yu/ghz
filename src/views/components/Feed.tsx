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

const Feed: React.FC<Props> = ({
  feed,
  handleReload,
  handleLoadNewerUpdates,
  handleLoadOlderUpdates,
  handleDiscard,
}) => (
  <View>
    <Button title="reload" onPress={handleReload} disabled={feed.isFeatching} />
    <Button
      title="load recent updates"
      onPress={handleLoadNewerUpdates}
      disabled={feed.isFeatching}
    />
    <Button
      title="load older updates"
      onPress={handleLoadOlderUpdates}
      disabled={feed.isFeatching}
    />
    <Button
      title="discard"
      onPress={handleDiscard}
      disabled={feed.isFeatching}
    />
    <p>{feed.cards.length}</p>
    <FlatList data={feed.cards} renderItem={renderListItem} />
  </View>
);

export default Feed;
