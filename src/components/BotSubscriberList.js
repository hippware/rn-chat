// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import Screen from './Screen';
import CardList from './CardList';
import ProfileItem from './ProfileItem';
import Separator from './Separator';
import location from '../store/locationStore';
import botStore from '../store/botStore';
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import botFactory from '../factory/botFactory';

type Props = {
  item: string
};

class SubscriberList extends React.Component {
  props: Props;

  static title = 'Subscribers';

  componentWillMount() {
    const bot = botFactory.create({id: this.props.item});
    botStore.loadSubscribers(bot);
  }

  render() {
    const bot = botFactory.create({id: this.props.item});
    const subscribers = bot.subscribers.map(x => x).filter(x => x);
    return (
      <Screen style={{paddingTop: 70 * k}}>
        <CardList
            isDay={location.isDay}
            keyboardShouldPersistTaps='always'
            data={subscribers}
            ItemSeparatorComponent={() => <Separator width={1} />}
            renderItem={({item}) =>
            <TouchableOpacity onPress={() => Actions.profileDetails({item: item.user})}>
              <ProfileItem isDay={location.isDay} profile={item} />
            </TouchableOpacity>}
            keyExtractor={item => item.user}
            removeClippedSubviews={false}
        />
      </Screen>
    );
  }
}

export default observer(SubscriberList);
