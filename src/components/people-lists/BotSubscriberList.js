// @flow

import React from 'react';
import {ActivityIndicator} from 'react-native';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react/native';
import Screen from '../Screen';
import CardList from '../CardList';
import Separator from '../Separator';
import {FollowableProfileItem} from './customProfileItems';

type Props = {
  item: string,
};

@inject('wocky')
@observer
class BotSubscriberList extends React.Component<Props> {
  props: Props;
  @observable bot: Bot;

  componentWillMount() {
    this.bot = this.props.wocky.getBot({id: this.props.item});
    this.bot.subscribers.load();
    // botStore.loadSubscribers(bot);
  }

  render() {
    const {connected} = this.props.wocky;
    const {list, finished} = this.bot.subscribers;
    console.log('subscribers', this.bot.toJSON(), this.bot.subscribers.toJSON(), this.bot.subscribers.finished);
    return (
      <Screen>
        <CardList
          keyboardShouldPersistTaps='always'
          data={list.slice()}
          ItemSeparatorComponent={() => <Separator width={1} />}
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          keyExtractor={item => item.user}
          ListFooterComponent={connected ? <ListFooter finished={finished} /> : null}
        />
      </Screen>
    );
  }
}

const ListFooter = () => <ActivityIndicator />;

export default BotSubscriberList;
