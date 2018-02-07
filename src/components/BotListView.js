// @flow

import React from 'react';
import {FlatList} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import BotCard from './BotCard';
import ListFooter from './ListFooter';

type Props = {
  filter?: string,
  user?: string,
  list?: Bots,
  header?: any,
  hideAvatar?: boolean,
};

const img = require('../../images/graphicEndBots.png');

@inject('wocky')
@observer
export default class BotListView extends React.Component<Props> {
  props: Props;
  list: any;

  scrollToTop = () => {
    this.list.scrollToOffset({x: 0, y: 0});
  };

  render() {
    const {filter, list, header, hideAvatar, wocky} = this.props;
    const bots: Bots = filter === 'all' ? wocky.profile.subscribedBots : filter === 'own' ? wocky.profile.ownBots : list;
    const {finished} = bots;
    const {connected} = wocky;

    return (
      <FlatList
        data={bots.list.slice()}
        ref={l => (this.list = l)}
        onEndReachedThreshold={0.5}
        onEndReached={bots.load}
        ListHeaderComponent={header}
        ListFooterComponent={connected ? <ListFooter footerImage={img} finished={finished} style={{marginTop: !finished && bots.list.length === 0 ? 100 : 0}} /> : null}
        renderItem={({item}) => <BotCard item={item} hideAvatar={hideAvatar} onPress={i => Actions.botDetails({item: i.id})} />}
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}
