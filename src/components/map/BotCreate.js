// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import location from '../../store/locationStore';
import Screen from '../Screen';
import botStore from '../../store/botStore';
import BotAddress from './BotAddress';
import analyticsStore from '../../store/analyticsStore';
import {toJS} from 'mobx';
import {RText} from '../common';
import {k} from '../Global';
import {colors} from '../../constants';

class BotCreate extends React.Component<{}> {
  static rightButton = () => {
    return (
      <TouchableOpacity onPress={() => Actions.botCompose({isFirstScreen: false})} style={{marginRight: 20 * k}}>
        <RText size={15} color={colors.PINK}>
          Next
        </RText>
      </TouchableOpacity>
    );
  };

  componentWillMount() {
    // TODO: prevent this from firing after creating a new bot and popping
    botStore.create();
    analyticsStore.track('botcreate_start');
  }

  save = (data: Object) => {
    if (data) {
      botStore.bot.load(data);
    }
    analyticsStore.track('botcreate_chooselocation', toJS(botStore.bot));
    Actions.botCompose({isFirstScreen: true});
  };

  render() {
    return (
      <Screen isDay={location.isDay}>
        <BotAddress onSave={this.save} />
      </Screen>
    );
  }
}

export default BotCreate;
