// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import locationStore from '../../store/locationStore';
import Screen from '../Screen';
import botStore from '../../store/botStore';
import geocodingStore from '../../store/geocodingStore';
import BotAddress from './BotAddress';
import analyticsStore from '../../store/analyticsStore';
import {toJS} from 'mobx';
import {RText} from '../common';
import {k} from '../Global';
import {colors} from '../../constants';

class BotCreate extends React.Component<{}> {
  trackTimeout: any;

  static rightButton = () => {
    return (
      <TouchableOpacity onPress={() => BotCreate.save()} style={{marginRight: 20 * k}}>
        <RText size={15} color={colors.PINK}>
          Next
        </RText>
      </TouchableOpacity>
    );
  };

  async componentWillMount() {
    botStore.create();
    const {location} = locationStore;
    botStore.bot.location = location;
    botStore.bot.isCurrent = true;
    const data = await geocodingStore.reverse(location);
    botStore.changeBotLocation({...data, location, isCurrent: true});
  }

  componentDidMount() {
    // HACK: prevent this from firing *after* creating a new bot and popping
    this.trackTimeout = setTimeout(() => analyticsStore.track('botcreate_start'), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.trackTimeout);
  }

  static save = (data: Object) => {
    if (data) {
      botStore.bot.load(data);
    }
    analyticsStore.track('botcreate_chooselocation', toJS(botStore.bot));
    Actions.botCompose();
  };

  render() {
    return (
      <Screen isDay={locationStore.isDay}>
        <BotAddress onSave={BotCreate.save} />
      </Screen>
    );
  }
}

export default BotCreate;
