// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import Screen from '../Screen';
import CardList from '../CardList';
import Separator from '../Separator';
import location from '../../store/locationStore';
import botStore from '../../store/botStore';
import botFactory from '../../factory/botFactory';
import {FollowableProfileItem} from './customProfileItems';

type Props = {
  item: string,
};

@observer
class SubscriberList extends React.Component {
  props: Props;

  componentWillMount() {
    const bot = botFactory.create({id: this.props.item});
    botStore.loadSubscribers(bot);
  }

  render() {
    const bot = botFactory.create({id: this.props.item});
    const subscribers = bot.subscribers.map(x => x).filter(x => x);
    return (
      <Screen>
        <CardList
          isDay={location.isDay}
          keyboardShouldPersistTaps='always'
          data={subscribers}
          ItemSeparatorComponent={() => <Separator width={1} />}
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          keyExtractor={item => item.user}
        />
      </Screen>
    );
  }
}

export default SubscriberList;
