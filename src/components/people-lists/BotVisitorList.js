// @flow

import React from 'react';
import {autorun, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {observer, inject} from 'mobx-react/native';
import Screen from '../Screen';
import CardList from '../CardList';
import {Separator} from '../common';
import {TappableProfileItem} from './customProfileItems';
import ListFooter from '../ListFooter';

type Props = {
  item: string,
};

@inject('wocky', 'locationStore')
@observer
class BotVisitorList extends React.Component<Props> {
  props: Props;
  @observable bot: Bot;
  handler;

  componentWillMount() {
    this.bot = this.props.wocky.getBot({id: this.props.item});
    this.bot.visitors.load({force: true});
    this.props.wocky.loadBot(this.props.item);
  }

  componentDidMount() {
    handler = autorun(() => {
      if (!this.props.locationStore.alwaysOn) {
        Actions.pop();
      }
    });
  }

  componentWillUnmount() {
    handler();
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
