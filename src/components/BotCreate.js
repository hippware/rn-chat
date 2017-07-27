import React from 'react';
import {Actions} from 'react-native-router-flux';
import {LeftButton} from 'react-native-router-flux/dist/NavBar';
import location from '../store/locationStore';
import Screen from './Screen';
import botStore from '../store/botStore';
import BotAddress from './BotAddress';

const save = (data) => {
  if (data) {
    botStore.bot.load(data);
  }
  Actions.botInfo({isFirstScreen: true});
};

export default class extends React.Component {
  componentWillMount() {
    botStore.create();
  }
  render() {
    return (<Screen isDay={location.isDay}>
      <BotAddress onSave={save} />
      <LeftButton leftButtonStyle={{position: 'absolute', left: 13, top: 29}} onLeft={Actions.pop} leftButtonImage={require('../../images/iconClose.png')} />
    </Screen>);
  }
}
