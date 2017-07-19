import React from 'react';
import location from '../store/locationStore';
import {Actions} from 'react-native-router-flux';
import Screen from './Screen';
import botStore from '../store/botStore';
import BotAddress from './BotAddress';
import {observer} from 'mobx-react/native';

const save = (data) => {
  if (data) {
    botStore.bot.load(data);
  }
  Actions.botInfo({isFirstScreen: true});
};

export default observer(() =>
  (<Screen isDay={location.isDay}>
    <BotAddress onSave={save} />
  </Screen>),
);
