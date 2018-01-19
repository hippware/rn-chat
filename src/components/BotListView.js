// @flow

import React from 'react';
import {FlatList} from 'react-native';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-router-flux';
// import BotCard from './BotCard';
// import ListFooter from './ListFooter';

type Props = {
  filter?: string,
  // user?: string,
  // list?: Bots,
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

  async loadMore() {
    // if (!botStore.started) return;
    // const {filter, user, list} = this.props;
    // if (filter === 'all') {
    //   await botStore.subscribed(model.subscribedBots.earliestId);
    // } else if (filter === 'own') {
    //   await botStore.list(model.ownBots);
    // } else {
    //   await botStore.list(list, user);
    // }
  }

  render() {
    const {filter, list, header, hideAvatar} = this.props;
    // const bots: Bots = filter === 'all' ? model.subscribedBots : filter === 'own' ? model.ownBots : list;
    // const {finished} = bots;
    // const {connected} = model;

    return (
      <FlatList
        // data={bots.list.slice()}
        data={[]}
        ref={l => (this.list = l)}
        // onEndReachedThreshold={0.5}
        // onEndReached={this.loadMore}
        ListHeaderComponent={header}
        // ListFooterComponent={connected ? <ListFooter footerImage={img} finished={finished} style={{marginTop: !finished && bots.list.length === 0 ? 100 : 0}} /> : null}
        // renderItem={({item}) => <BotCard item={item} hideAvatar={hideAvatar} onPress={i => Actions.botDetails({item: i.id})} />}
        renderItem={() => null}
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}
