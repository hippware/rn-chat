// @flow

import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react/native';
import Screen from '../Screen';
import CardList from '../CardList';
import {Separator} from '../common';
import {TappableProfileItem} from './customProfileItems';
import ListFooter from '../ListFooter';

type Props = {
  item: string,
};

@inject('wocky')
@observer
class BotVisitorList extends React.Component<Props> {
  props: Props;
  @observable bot: Bot;

  componentWillMount() {
    this.bot = this.props.wocky.getBot({id: this.props.item});
    this.bot.visitors.load({force: true});
    this.props.wocky.loadBot(this.props.item);
  }

  render() {
    const {connected} = this.props.wocky;
    const {list, finished} = this.bot.visitors;
    return (
      <Screen>
        <CardList
          keyboardShouldPersistTaps='always'
          data={list.slice()}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({item}) => <TappableProfileItem profile={item} />}
          keyExtractor={item => item.id}
          ListFooterComponent={connected ? <ListFooter finished={finished} /> : null}
        />
      </Screen>
    );
  }
}

export default BotVisitorList;
