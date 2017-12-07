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
  </Screen>
));

export default BotAddressScene;
