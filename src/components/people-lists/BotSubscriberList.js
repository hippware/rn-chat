// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import Screen from '../Screen';
import CardList from '../CardList';
import Separator from '../Separator';
import location from '../../store/locationStore';
import botStore from '../../store/botStore';
import {FollowableProfileItem} from './customProfileItems';
import {injectBot} from '../hocs';
import Bot from '../../model/Bot';

type Props = {
  bot: Bot,
};

@observer
class SubscriberList extends React.Component {
  props: Props;

  componentWillMount() {
    botStore.loadSubscribers(this.props.bot);
  }

  render() {
    const subscribers = this.props.bot.subscribers.map(x => x).filter(x => x);
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

export default injectBot(SubscriberList);
