// @flow

import React, {Component} from 'react';
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
  list?: Bots,
  header?: any,
  hideAvatar?: boolean,
};

@autobind
@observer
export default class BotListView extends Component {
  props: Props;
  list: any;

  scrollToTop() {
    this.list.scrollToOffset({x: 0, y: 0});
  }

  async loadMore() {
    const {filter, user, list} = this.props;
    if (filter === 'all') {
      await botStore.following(model.followingBots.earliestId);
    } else if (filter === 'own') {
      await botStore.list(model.ownBots);
    } else {
      await botStore.list(list, user);
    }
  }
  render() {
    const {filter, list, header, hideAvatar} = this.props;
    const bots: Bots = filter === 'all' ? model.followingBots : filter === 'own' ? model.ownBots : list;
    const finished = bots.finished;
    return (
      <FlatList
        data={bots.list}
        ref={l => (this.list = l)}
        removeClippedSubviews={false} // workaround for react-native bug #13316, https://github.com/react-community/react-navigation/issues/1279
        onEndReachedThreshold={0.5}
        onEndReached={this.loadMore}
        initialNumToRender={6}
        ListHeaderComponent={header}
        ListFooterComponent={observer(() => <ListFooter footerImage={require('../../images/graphicEndBots.png')} finished={finished} />)}
        renderItem={({item}) => <BotCard item={item} hideAvatar={hideAvatar} onPress={i => Actions.botDetails({item: i.id})} />}
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}
