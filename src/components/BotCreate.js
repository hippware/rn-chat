import React from 'react';
import location from '../store/locationStore';
import {Actions} from 'react-native-router-flux';
import Screen from './Screen';
import botStore from '../store/botStore';
import BotAddress from './BotAddress';
import {observer} from 'mobx-react/native';
import {LeftButton} from 'react-native-router-flux/dist/NavBar';

const save = (data) => {
  if (data) {
    botStore.bot.load(data);
  }
  Actions.botInfo({isFirstScreen: true});
};

export default observer((props) =>
  (<Screen isDay={location.isDay}>
    <BotAddress onSave={save} />
    <LeftButton leftButtonStyle={{position: 'absolute', left: 13, top: 29}} onLeft={Actions.pop} leftButtonImage={require('../../images/iconClose.png')} />
  </Screen>),
);
