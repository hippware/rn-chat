// @flow

import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react/native';
import Screen from '../Screen';
import CardList from '../CardList';
import Separator from '../Separator';
import {FollowableProfileItem} from './customProfileItems';
import ListFooter from '../ListFooter';

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
    this.bot.subscribers.load({force: true});
    this.props.wocky.loadBot(this.props.item);
  }

  render() {
    const {connected} = this.props.wocky;
    const {list, finished} = this.bot.subscribers;
    return (
      <Screen>
        <CardList
          keyboardShouldPersistTaps='always'
          data={list.slice()}
          ItemSeparatorComponent={() => <Separator width={1} />}
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          keyExtractor={item => item.id}
          ListFooterComponent={connected ? <ListFooter finished={finished} /> : null}
        />
      </Screen>
    );
  }
}

export default BotSubscriberList;
