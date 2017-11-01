import React from 'react';
import {Actions} from 'react-native-router-flux';
import {LeftButton} from 'react-native-router-flux/dist/NavBar';
import location from '../../store/locationStore';
import Screen from '../Screen';
import botStore from '../../store/botStore';
import BotAddress from './BotAddress';
import analyticsStore from '../../store/analyticsStore';
import {toJS} from 'mobx';

const save = (data) => {
  if (data) {
    botStore.bot.load(data);
  }
  analyticsStore.track('botcreate_chooselocation', toJS(botStore.bot));
  Actions.botCompose({isFirstScreen: true});
};

export default class extends React.Component {
  componentWillMount() {
    // TODO: prevent this from firing after creating a new bot and popping
    botStore.create();
    analyticsStore.track('botcreate_start');
  }
  render() {
    return (
      <Screen isDay={location.isDay}>
        <BotAddress onSave={save} />
        <LeftButton leftButtonStyle={{position: 'absolute', left: 13, top: 29}} onLeft={Actions.pop} leftButtonImage={require('../../../images/iconClose.png')} />
      </Screen>
    );
  }
}
