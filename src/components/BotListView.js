// @flow

import React from 'react';
import {FlatList} from 'react-native';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-router-flux';
import BotCard from './BotCard';
import Bots from '../model/Bots';
import model from '../model/model';
import botStore from '../store/botStore';
import ListFooter from './ListFooter';

type Props = {
  filter?: string,
  user?: string,
  list: Bots,
  header?: any,
  hideAvatar?: boolean,
};

const img = require('../../images/graphicEndBots.png');

@autobind
@observer
export default class BotListView extends React.Component<Props> {
  props: Props;
  list: any;

  scrollToTop() {
    this.list.scrollToOffset({x: 0, y: 0});
  }

  loadMore() {
    const {filter, user, list} = this.props;
    if (filter === 'all') {
      botStore.subscribed(model.subscribedBots.earliestId);
    } else if (filter === 'own') {
      botStore.list(model.ownBots);
    } else {
      botStore.list(list, user);
    }
  }

  renderFooter = (bots, finished) =>
    (bots.list.length ? <ListFooter footerImage={img} finished={finished} style={{marginTop: !finished && bots.list.length === 0 ? 100 : 0}} /> : null);

  render() {
    const {filter, list, header, hideAvatar} = this.props;
    const bots: Bots = filter === 'all' ? model.subscribedBots : filter === 'own' ? model.ownBots : list;
    const {finished} = bots;
    return (
      <FlatList
        data={bots.list}
        ref={l => (this.list = l)}
        onEndReachedThreshold={0.5}
        onEndReached={this.loadMore}
        initialNumToRender={6}
        ListHeaderComponent={header}
        ListFooterComponent={() => this.renderFooter(bots, finished)}
        renderItem={({item}) => <BotCard item={item} hideAvatar={hideAvatar} onPress={i => Actions.botDetails({item: i.id})} />}
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}
