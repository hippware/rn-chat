// @flow

import React from 'react';
import location from '../../store/locationStore';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import BotAddress from './BotAddress';
import {observer} from 'mobx-react/native';
import {LeftButton} from 'react-native-router-flux/dist/NavBar';

const BotAddressScene = observer(props => (
  <Screen isDay={location.isDay}>
    <BotAddress />
    <LeftButton leftButtonStyle={{position: 'absolute', left: 9, top: 32}} onLeft={Actions.pop} leftButtonImage={require('../../../images/iconBackGray.png')} />
  </Screen>
));

export default BotAddressScene;
